import unittest
import app.db.crud as crud
from datetime import datetime
from app.db.database_setup import *
import os

TEST_DB_NAME = 'housing_test.db'
TEST_DB_STRING = 'sqlite:///housing_test.db'


class TestDB(unittest.TestCase):
    def test_createdb(self):
        is_success = createDB(TEST_DB_STRING)
        self.assertEqual(is_success, True)  # return none upon success
        # check if the db is generated
        is_exist = os.path.exists(TEST_DB_NAME)
        self.assertEqual(is_exist, True)
        if is_exist:
            os.remove(TEST_DB_NAME)


class TestCRUD(unittest.TestCase):
    def __init__(self, session=None):
        super(TestCRUD, self).__init__(session)
        createDB(TEST_DB_STRING)
        self.session = crud.getSession(TEST_DB_STRING)

    def test_addUser(self):
        user_name = "cris"
        user_email = "haha@ucsd.edu"
        created_time = datetime.now()
        user_phone = "858-2867-3567"
        user_description = "cultured man"
        user_school_year = "Third"
        user_major = "Data Science"
        user_object = crud.add_user(user_name, user_email,
                                    created_time, user_phone,
                                    user_description, user_school_year,
                                    user_major, self.session)
        # check if the return object has correct information
        self.assertEqual(user_object.email, user_email)
        self.assertEqual(user_object.name, user_name)
        self.assertEqual(user_object.date_created, created_time)
        self.assertEqual(user_object.phone, user_phone)
        self.assertEqual(user_object.description, user_description)
        self.assertEqual(user_object.school_year, user_school_year)
        self.assertEqual(user_object.major, user_major)
        # check if the user is loaded into the database
        query_object = crud.check_exist(
            User, self.session, **{'email': user_email})
        self.assertEqual(query_object == user_object, True)


if __name__ == '__main__':
    unittest.main()
    is_exist = os.path.exists(TEST_DB_NAME)
    if is_exist:
        os.remove(TEST_DB_NAME)
