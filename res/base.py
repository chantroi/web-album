import boto3
import os
from botocore.exceptions import NoCredentialsError


class S3Manager:
    def __init__(self):
        access_key = os.getenv('ACCESS_KEY')
        secret_key = os.getenv('SECRET_KEY')
        self.bucket_name = "storage"
        self.s3_client = boto3.client('s3', aws_access_key_id=access_key, aws_secret_access_key=secret_key)

    def upload_file(self, file_path, object_name=None):
        if object_name is None:
            object_name = file_path
        try:
            self.s3_client.upload_file(file_path, self.bucket_name, object_name)
            print("Upload successful")
        except FileNotFoundError:
            print("The file was not found")
        except NoCredentialsError:
            print("Credentials not available")

    def download_file(self, object_name, file_path):
        try:
            self.s3_client.download_file(self.bucket_name, object_name, file_path)
            print("Download successful")
        except NoCredentialsError:
            print("Credentials not available")

    def list_files(self):
        try:
            response = self.s3_client.list_objects_v2(Bucket=self.bucket_name)
            if 'Contents' in response:
                for obj in response['Contents']:
                    print(obj['Key'])
            else:
                print("Bucket is empty")
        except NoCredentialsError:
            print("Credentials not available")

    def generate_public_link(self, object_name, expiration=3600):  # Expiration time in seconds
        try:
            url = self.s3_client.generate_presigned_url('get_object', Params={'Bucket': self.bucket_name, 'Key': object_name}, ExpiresIn=expiration)
            print("Public link:", url)
        except NoCredentialsError:
            print("Credentials not available")