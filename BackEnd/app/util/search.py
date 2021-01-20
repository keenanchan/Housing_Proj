from app.assets.options import months, intervals
from app.db.database_setup import Room, Move_In, Address
from app.db.crud import room_json as convert_room_json


def compareMonth(early, late, curr, flag="early", reverse=False):
    ear_interval, ear_month = early  # tuple
    lat_interval, lat_month = late
    interval, month = curr
    print(ear_interval, ear_month, lat_interval, lat_month, interval, month)
    if ((lat_month > ear_month) or (lat_month == ear_month and lat_interval >= ear_interval)):
        interval_rank, month_rank = intervals.index(
            interval), months.index(month)
        earinterval_rank, earmonth_rank = intervals.index(
            ear_interval), months.index(ear_month)
        latinterval_rank, latmonth_rank = intervals.index(
            lat_interval), months.index(lat_month) or 13
        # check early month rank fits requirement
        early_check = (month_rank > earmonth_rank or
                       (month_rank == earmonth_rank and (
                           interval_rank >= earinterval_rank
                           or interval_rank == 0)))
        # check late month rank fits requirement
        late_check = (month_rank < latmonth_rank or
                      (month_rank == latmonth_rank and (
                          interval_rank <= latinterval_rank
                          or latinterval_rank == 0)))
        return early_check and late_check
    else:
        if flag == "early":
            return (month > ear_month) or (month == ear_month and interval >= ear_interval)
        else:
            if reverse:
                return (lat_month > month) or (month == lat_month and interval <= lat_interval)
            else:
                return (month > ear_month) or (month == ear_month and interval >= ear_interval)


def checkOther(house, request):
    return len(set(house).intersection(set(request))) >= 1 or len(request) == 0


def search(room_json, session):
    res = session.query(Room).filter(
        room_json['price_min'] <= Room.price,
        Room.price <= room_json['price_max'],
        Room.stay_period == room_json['stay_period'],
        Room.no_rooms >= float(
            room_json['numBeds']),
        Room.no_bathrooms >= float(room_json['numBaths']),).all()
    return [convert_room_json(elem, session) for elem in res if
            float(elem.address.serialize['distance'].split(" ")[0]) < float(
                room_json['distance'].split(" ")[0])
            and
            elem.room_type in room_json['room_type']
            and
            (compareMonth((room_json['early_interval'], room_json['early_month']),
                          (room_json['late_interval'],
                           room_json['late_month']),
                          (elem.move_in.late_interval, elem.move_in.late_month
                           ), 'late',
                          ((elem.move_in.early_month > elem.move_in.late_month)
                           or (elem.move_in.early_month == elem.move_in.late_month
                               and elem.move_in.late_interval < elem.move_in.early_interval)))
             or
             compareMonth((room_json['early_interval'], room_json['early_month']),
                          (room_json['late_interval'],
                           room_json['late_month']),
                          (elem.move_in.early_interval, elem.move_in.early_month
                           )
                          ), 'early',
             ((elem.move_in.early_month > elem.move_in.late_month)
              or (elem.move_in.early_month == elem.move_in.late_month
                  and elem.move_in.late_interval < elem.move_in.early_interval))
             )
            and
            checkOther([att.attribute_name for att in elem.house_attribute],
                       room_json['other']+room_json['facilities'])
            ]
