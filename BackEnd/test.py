import unittest
from util import email_verify 
class TestAuth(unittest.TestCase):
    """Testing file for all methods in authentification.py

    This file is for automation tests everytime a new PR is created.
    """

    def test_gconnect(self):
        """testing gconnect method"""
        self.assertEqual(True,email_verify('hahah@ucsd.edu'))
        self.assertEqual(False,email_verify('hahah@usc.edu'))
if __name__ == '__main__':
    unittest.main()