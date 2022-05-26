class Solution:
    def moveZeroes(self, nums: list[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        zero_start = 0
        limit = len(nums) - 1

        while zero_start < limit:
            if nums[zero_start] == 0:
                zero_end = zero_start + 1

                while zero_end <= limit and nums[zero_end] == 0:
                    zero_end += 1

                for i in range(zero_start, zero_end):
                    nums.append(nums.pop(zero_start))

            zero_start += 1

    # def moveZeroes(self, nums: list[int]) -> None:
    #     """
    #     Do not return anything, modify nums in-place instead.
    #     """
    #     i = 0

    #     while i < len(nums):
    #         if nums[i] == 0:
    #             popped = nums.pop(i)
    #             nums.append(popped)

    #             if popped == 0:
    #                 i += 1
    #         else:
    #             i += 1


solution = Solution()

lst = [0, 0, 1, 0, 3, 12, 0, 0, 0, 1, 1, 0, 23, 0, 2, 5, 6, 3, 0]

solution.moveZeroes(lst)

print(lst)

# Make two pointers
# Search for zero
# search for non_zero
# switch
# update index of non_zero to zero
# update index of zero to non_zero + 1
