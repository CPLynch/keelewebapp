#Running this file will test the bubbleSortFunction in sorting.py

import unittest
from utils.sorting import bubbleSortFunction
from utils.get_data import getTweetData

class TestBubbleSort(unittest.TestCase):

    def test_bubble_sort_with_positive_numbers(self):
        self.assertEqual(bubbleSortFunction([5, 5, 7, 8, 2, 4, 1]), [1, 2, 4, 5, 5, 7, 8])

    def test_bubble_sort_empty_list(self):
        self.assertEqual(bubbleSortFunction([]), [])

    ######## new unit tests ########

    def test_bubble_sort_with_positive_and_negative_numbers_and_zero(self):
        self.assertEqual(bubbleSortFunction([-3, -3, 4, -7, 4, 8, -9, 0, 0, 1, 0 ,8, 6, -3,-5]), [-9, -7, -5, -3, -3, -3, 0, 0, 0, 1, 4, 4, 6, 8, 8])
    
    def test_bubble_sort_with_strings(self):
        self.assertEqual(bubbleSortFunction(["a", "a", "g", "c", "A", "a", "A", "b", "z", "Z", "z" ,"Z", "g", "a", "d"]), ['A', 'A', 'Z', 'Z', 'a', 'a', 'a', 'a', 'b', 'c', 'd', 'g', 'g', 'z', 'z'])
  
    def test_length_of_tweet_data_is_forty(self):
        self.assertEqual(40, len(getTweetData()))
        
if __name__ == '__main__':
    unittest.main(verbosity=3)