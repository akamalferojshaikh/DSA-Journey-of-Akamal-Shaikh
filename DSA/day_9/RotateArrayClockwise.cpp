// Link: https://www.geeksforgeeks.org/problems/rotate-array-clockwise/1

//Solution 1

/*

class Solution {
  public:
    void rotateclockwise(vector<int>& arr, int k) {
        // code here
        
        
        while(k){
        int n =arr.size();
        int last_element = arr[n-1];
        for(int i=n-2;i>=0;i--){
            arr[i+1]=arr[i];
        }
        arr[0] = last_element;
        k--;
        }
    }
};


*/


//Solution 1 {Better Solution :)}

/*

class Solution {
  public:
    void rotateclockwise(vector<int>& arr, int k) {
        // code here
        int n = arr.size();
        vector<int>nums(n);
        
        for(int i=0; i<n;i++){
            nums[(i+k)%n] = arr[i];
        }
        for(int i =0;i<n;i++){
            arr[i] = nums[i];
        }
    }
};


*/