// Link - https://www.geeksforgeeks.org/problems/second-largest3735/1

// Solution

/*

class Solution {
  public:
    int getSecondLargest(vector<int> &arr) {
        // code here
        int n = arr.size();
        int largest = arr[0];
        for(int i =0;i<n;i++){
            if(arr[i]>largest){
                largest = arr[i];
            }
        }
        
        int second_largest = -1;
        for(int i=0;i<n;i++){
            if(arr[i] == largest){
                continue;
            }
            else if(arr[i]>second_largest){
                second_largest = arr[i];
            }
        }
        return second_largest;
    }
};

*/