import boto3
import logging
from botocore.exceptions import ClientError

s3_client = boto3.client('s3')


def upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name in the form of
    {user_name_folder/housing/room_name}.
    If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = file_name

    # Upload the file
    result = s3_client.get_bucket_acl(Bucket='houseit')
    try:
        response = s3_client.upload_file(
            file_name, bucket, object_name, ExtraArgs={'ACL': 'public-read'})
    except ClientError as e:
        logging.error(e)
        return False
    return True


def get_images(user_name, category="housing", extra_path=""):
    prefix = "{path1}/{path2}/{path3}/".format(
        path1=user_name, path2=category, path3=extra_path)
    contents = s3_client.list_objects(
        Bucket='houseit', Prefix=prefix)['Contents']
    links = []
    for key in contents:
        if "." in key['Key']:
            links.append(key['Key'])
    return links


print(get_images("amit", extra_path="Solazzo Apartment Homes"))
# example:
# upload_file("../../img/1.png", "houseit",
# "ali/housing/costa_verde/test2.png")
