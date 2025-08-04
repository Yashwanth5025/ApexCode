export const problemsData = [
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "Easy",
    category: "Array",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]." }
    ],
    constraints: ["2 <= nums.length <= 104", "-109 <= nums[i] <= 109", "-109 <= target <= 109", "Only one valid answer exists."],
    testCases: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]" },
      { input: "[3,2,4]\n6", expectedOutput: "[1,2]" }
    ]
  },
  {
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "Easy",
    category: "Stack",
    examples: [
      { input: 's = "()"', output: "true", explanation: "The string contains valid parentheses." },
      { input: 's = "()[]{}"', output: "true", explanation: "The string contains valid parentheses." }
    ],
    constraints: ["1 <= s.length <= 104", "s consists of parentheses only '()[]{}'"],
    testCases: [
      { input: '"()"', expectedOutput: "true" },
      { input: '"()[]{}"', expectedOutput: "true" }
    ]
  },
  {
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." }
    ],
    constraints: ["1 <= nums.length <= 105", "-104 <= nums[i] <= 104"],
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" }
    ]
  },
  {
    title: "Merge Two Sorted Lists",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list.",
    difficulty: "Easy",
    category: "Linked List",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]", explanation: "The merged list contains all nodes from both lists in sorted order." }
    ],
    constraints: ["The number of nodes in both lists is in the range [0, 50]", "-100 <= Node.val <= 100", "Both list1 and list2 are sorted in non-decreasing order"],
    testCases: [
      { input: "[1,2,4]\n[1,3,4]", expectedOutput: "[1,1,2,3,4,4]" }
    ]
  },
  {
    title: "Longest Palindromic Substring",
    description: "Given a string s, return the longest palindromic substring in s.",
    difficulty: "Medium",
    category: "String",
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' }
    ],
    constraints: ["1 <= s.length <= 1000", "s consist of only digits and English letters"],
    testCases: [
      { input: '"babad"', expectedOutput: '"bab"' }
    ]
  },
  {
    title: "Container With Most Water",
    description: "You are given an integer array height of length n. Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.",
    difficulty: "Medium",
    category: "Two Pointers",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "The maximum area is obtained by choosing height[1] = 8 and height[8] = 7." }
    ],
    constraints: ["n == height.length", "2 <= n <= 105", "0 <= height[i] <= 104"],
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49" }
    ]
  },
  {
    title: "3Sum",
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    difficulty: "Medium",
    category: "Array",
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "The triplets that sum to zero are [-1,-1,2] and [-1,0,1]." }
    ],
    constraints: ["3 <= nums.length <= 3000", "-105 <= nums[i] <= 105"],
    testCases: [
      { input: "[-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]" }
    ]
  },
  {
    title: "Binary Tree Inorder Traversal",
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: "Easy",
    category: "Tree",
    examples: [
      { input: "root = [1,null,2,3]", output: "[1,3,2]", explanation: "Inorder traversal visits nodes in the order: left, root, right." }
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 100]", "-100 <= Node.val <= 100"],
    testCases: [
      { input: "[1,null,2,3]", expectedOutput: "[1,3,2]" }
    ]
  },
  {
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: "Easy",
    category: "Dynamic Programming",
    examples: [
      { input: "n = 2", output: "2", explanation: "There are two ways to climb to the top: 1 step + 1 step, or 2 steps." }
    ],
    constraints: ["1 <= n <= 45"],
    testCases: [
      { input: "2", expectedOutput: "2" }
    ]
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Return the maximum profit you can achieve from this transaction.",
    difficulty: "Easy",
    category: "Array",
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." }
    ],
    constraints: ["1 <= prices.length <= 105", "0 <= prices[i] <= 104"],
    testCases: [
      { input: "[7,1,5,3,6,4]", expectedOutput: "5" }
    ]
  },
  {
    title: "Valid Anagram",
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    difficulty: "Easy",
    category: "String",
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true", explanation: "Both strings contain the same characters." }
    ],
    constraints: ["1 <= s.length, t.length <= 5 * 104", "s and t consist of lowercase English letters"],
    testCases: [
      { input: '"anagram"\n"nagaram"', expectedOutput: "true" }
    ]
  },
  {
    title: "Group Anagrams",
    description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    difficulty: "Medium",
    category: "Hash Table",
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: "Strings with the same character count are grouped together." }
    ],
    constraints: ["1 <= strs.length <= 104", "0 <= strs[i].length <= 100", "strs[i] consists of lowercase English letters"],
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }
    ]
  },
  {
    title: "Top K Frequent Elements",
    description: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    difficulty: "Medium",
    category: "Heap",
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]", explanation: "The two most frequent elements are 1 and 2." }
    ],
    constraints: ["1 <= nums.length <= 105", "k is in the range [1, the number of unique elements in the array]", "It is guaranteed that the answer is unique"],
    testCases: [
      { input: "[1,1,1,2,2,3]\n2", expectedOutput: "[1,2]" }
    ]
  },
  {
    title: "Product of Array Except Self",
    description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
    difficulty: "Medium",
    category: "Array",
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]", explanation: "answer[0] = 2*3*4 = 24, answer[1] = 1*3*4 = 12, etc." }
    ],
    constraints: ["2 <= nums.length <= 105", "-30 <= nums[i] <= 30", "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer"],
    testCases: [
      { input: "[1,2,3,4]", expectedOutput: "[24,12,8,6]" }
    ]
  },
  {
    title: "Longest Consecutive Sequence",
    description: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.",
    difficulty: "Medium",
    category: "Hash Table",
    examples: [
      { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4." }
    ],
    constraints: ["0 <= nums.length <= 105", "-109 <= nums[i] <= 109"],
    testCases: [
      { input: "[100,4,200,1,3,2]", expectedOutput: "4" }
    ]
  }
] 