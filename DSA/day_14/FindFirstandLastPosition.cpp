// https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/

/*

class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int n = nums.size();
        int start = 0, end = n-1;
        int index1 = -1;
        while(start<=end){
            int mid = start+(end-start)/2;
            if(target == nums[mid]){
                index1 = mid;
                end = mid-1;
            }
            else if(target > nums[mid]){
                start = mid+1;
            }
            else{
                end = mid-1;
           }
        }
        start = 0, end = n-1;
        int index2 = -1;
        while(start<=end){
            int mid = start+(end-start)/2;
            if(target == nums[mid]){
                index2 = mid;
                start = mid+1;
            }
            else if(target > nums[mid]){
                start = mid+1;
            }
            else{
                end = mid-1;
           }
        }
        vector<int>newarr;
        newarr.push_back(index1);
        newarr.push_back(index2);
    return newarr;
    }
};

*/