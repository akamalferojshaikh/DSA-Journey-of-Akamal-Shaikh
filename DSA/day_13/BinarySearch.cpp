// Question link https://strikes.in/practice/694fd7afae53764a0b4e68ed

/*


class Solution {
public:
    int search(vector<int>& nums, int target) {
        int n = nums.size();
        int low = 0,high = n-1;
        while(low<=high){
            int mid = (high+low)/2;
            if(nums[mid] == target){
                return mid;
            }
            else if(nums[mid]<target){
                low = mid+1;
            }
            else{
                high = mid-1;
            }
        }
    return -1;
    }
};

*/

/*

class Solution {
  public:
    int binarysearch(vector<int> &arr, int k) {
        // code here
        int n = arr.size();
        int low = 0,high = n-1;
        int ans = -1;
        while(low<=high){
            int mid = (high+low)/2;
            if(arr[mid] == k){
                ans = mid;
                high = mid-1;
            }
            else if(arr[mid]<k){
                low = mid+1;
            }
            else{
                high = mid-1;
            }
        }
    return ans;
    }
};










*/