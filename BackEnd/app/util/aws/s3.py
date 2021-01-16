import boto3
import logging
from botocore.exceptions import ClientError
import sys
import getopt

s3_client = boto3.client('s3')

# test whether I can upload http images
def upload_file_wname(file_name, bucket, object_name=None):
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
    try:
        response = s3_client.upload_file(
            file_name, bucket, object_name, ExtraArgs={'ACL': 'public-read'})
    except ClientError as e:
        logging.error(e)
        return False
    return True


def upload_file_wobject(file_object, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_object: File object to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name in the form of
    {user_name_folder/housing/room_name}.
    If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = file_object.filename

    # Upload the file
    try:
        response = s3_client.upload_fileobj(
            file_object, bucket, object_name, ExtraArgs={'ACL': 'public-read'})
    except ClientError as e:
        logging.error(e)
        return False
    return True


def get_images(user_name, category="housing", extra_path=""):
    prefix = "/".join([user_name, category, extra_path])
    # TODO error handling if no files
    print(prefix)
    contents = s3_client.list_objects(
        Bucket='houseit', Prefix=prefix)['Contents']
    links = []
    for key in contents:
        if key['Key'][-4:] in ['.jpg', '.png', '.svg'] or key['Key'][-5:] in '.jpeg':
            links.append(key['Key'])
    return links


def main(argv):
    try:
        opts, args = getopt.getopt(argv, "n:h:")
    except getopt.GetoptError:
        print('you need to specify a value for the given command!')
        sys.exit(2)
    name = home = None
    for opt, arg in opts:
        if opt == '-n':
            name = arg
        elif opt == '-h':
            home = arg
    print(name, home)
    print(get_images(name, extra_path=home))


if __name__ == "__main__":
    main(sys.argv[1:])
