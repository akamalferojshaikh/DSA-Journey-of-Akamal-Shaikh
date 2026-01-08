/*

https://leetcode.com/problems/search-in-rotated-sorted-array/description/


class Solution {
public:
    int search(vector<int>& nums, int target) {
       int n = nums.size();
       int left = 0,right =n-1;
       while(left<=right){
        int mid = left+(right-left)/2;

        if(nums[mid] == target){
            return mid;
        }

        else if(nums[mid]>=nums[0]){
            if(target >=nums[left] && target<nums[mid]){
                // target = mid;
                right = mid-1;
            }
            else{
                left = mid+1;
                // return mid;
            }
        }
        else {
            if(target>nums[mid] && target <=nums[right]){
                left = mid+1;
            }
            else{
                right = mid-1;
                // return mid;
            }
        }
       }
       return -1; 
    }
};






*/