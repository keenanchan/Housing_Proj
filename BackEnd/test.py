import unittest
from util import email_verify 
class TestAuth(unittest.TestCase):

    def test_gconnect(self):
        self.assertEqual(True,email_verify('hahah@ucsd.edu'))
        self.assertEqual(False,email_verify('hahah@usc.edu'))
        self.assertEqual(True,email_verify('hahah@ucb.edu'))
if __name__ == '__main__':
    unittest.main()