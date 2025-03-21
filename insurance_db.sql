-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2025 at 02:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `insurance_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ACTIVE',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `candidates`
--

CREATE TABLE `candidates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `organization_id` bigint(20) UNSIGNED NOT NULL,
  `diploma_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `employer_id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_internal` tinyint(1) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ACTIVE',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employers`
--

CREATE TABLE `employers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ACTIVE',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employers`
--

INSERT INTO `employers` (`id`, `user_id`, `name`, `email`, `phone`, `address`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'Hillary Okello Opany', 'hillaryokello12@gmail.com', '0111781133', '1125', 'ACTIVE', '2025-03-21 09:50:04', '2025-03-21 09:50:04'),
(2, 3, 'okello', 'hillaryokello1@gmail.com', '0111781133', '1125', 'ACTIVE', '2025-03-21 10:20:48', '2025-03-21 10:20:48');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `insurance_policies`
--

CREATE TABLE `insurance_policies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `policy_number` varchar(255) NOT NULL,
  `coverage` text NOT NULL,
  `premium` decimal(10,2) NOT NULL,
  `expiry_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `insurance_policies`
--

INSERT INTO `insurance_policies` (`id`, `name`, `policy_number`, `coverage`, `premium`, `expiry_date`, `created_at`, `updated_at`) VALUES
(1, 'Health Guard Plus', 'HG12345', 'Covers hospitalization, emergency care, and outpatient services.', 5000.00, '2025-01-10', '2025-03-21 09:26:13', '2025-03-21 09:26:13'),
(3, 'Health', 'Hggdd', 'emergency care, and outpatient services.', 5000.00, '2025-01-10', '2025-03-21 12:45:08', '2025-03-21 12:45:08');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000001_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2014_10_25_174529_create_employers_table', 1),
(4, '2014_11_25_174629_create_admins_table', 1),
(5, '2019_08_19_000000_create_failed_jobs_table', 1),
(6, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(7, '2024_09_24_125036_create_employees_table', 1),
(8, '2024_09_24_133646_create_submission_requests_table', 1),
(9, '2024_09_24_133822_create_uploads_table', 1),
(10, '2024_11_11_111742_create_organizations_table', 1),
(11, '2024_11_11_115854_create_candidates_table', 1),
(12, '2025_03_21_112654_create_insurance_policies_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User\\User', 1, 'HussYana', '5c2baf0ed24afd98d3ff2010bad0ce9e5de7a4612327f99738ce3a5c84a03eb6', '[\"*\"]', '2025-03-21 11:26:08', '2025-03-22 09:18:35', '2025-03-21 09:18:35', '2025-03-21 11:26:08'),
(2, 'App\\Models\\User\\User', 1, 'HussYana', '799bb4efe85331638e160eb8ce56eec389b6024a0d9de00a5e0528140aa8de7e', '[\"*\"]', '2025-03-21 10:20:03', '2025-03-22 09:51:00', '2025-03-21 09:51:00', '2025-03-21 10:20:03'),
(3, 'App\\Models\\User\\User', 1, 'HussYana', 'c3f61b027ec50af2087c77d10b98d4fc88ee3432095d3638d6fd1f9c5e49a07a', '[\"*\"]', '2025-03-21 11:00:39', '2025-03-22 10:20:17', '2025-03-21 10:20:17', '2025-03-21 11:00:39'),
(4, 'App\\Models\\User\\User', 1, 'HussYana', '44aa4f7a3aab6ec466e421e8525e5980a2c552c6b452253d99d82028aafac3c2', '[\"*\"]', '2025-03-21 11:52:17', '2025-03-22 11:02:23', '2025-03-21 11:02:23', '2025-03-21 11:52:17'),
(5, 'App\\Models\\User\\User', 1, 'HussYana', '58b673c3a21a0d1311dbb686ca71bca45331554862b0825a6ebe71f84666a2b9', '[\"*\"]', '2025-03-21 12:24:25', '2025-03-22 12:04:03', '2025-03-21 12:04:03', '2025-03-21 12:24:25'),
(6, 'App\\Models\\User\\User', 1, 'HussYana', 'f614b4717f3fe304cd985f04cbddc4c9abf9d77de8b6f9132350914de3ea400a', '[\"*\"]', '2025-03-21 12:17:44', '2025-03-22 12:15:23', '2025-03-21 12:15:23', '2025-03-21 12:17:44'),
(7, 'App\\Models\\User\\User', 1, 'HussYana', 'fb5b3de99f18e8f8cdd48e6b8fedc93d3d5edec97cdc2f922b145bbe32e9d1fa', '[\"*\"]', NULL, '2025-03-22 12:19:31', '2025-03-21 12:19:31', '2025-03-21 12:19:31'),
(8, 'App\\Models\\User\\User', 1, 'HussYana', '41c63682489183b92867d639c4af8b924979683fc751335e09052c28c2e2d3cd', '[\"*\"]', '2025-03-21 12:25:27', '2025-03-22 12:25:19', '2025-03-21 12:25:19', '2025-03-21 12:25:27'),
(9, 'App\\Models\\User\\User', 1, 'HussYana', 'f9a596691aafd8e19a92c886270560f64f37a8cc2e4d326e5f0b51a8f3867a38', '[\"*\"]', NULL, '2025-03-22 12:28:49', '2025-03-21 12:28:49', '2025-03-21 12:28:49'),
(10, 'App\\Models\\User\\User', 1, 'HussYana', '29300c7d748a0cecf96384b0c9ab6748d9e649ff620f36d1abf0c8aaf80d05d7', '[\"*\"]', '2025-03-21 12:30:48', '2025-03-22 12:30:37', '2025-03-21 12:30:37', '2025-03-21 12:30:48'),
(11, 'App\\Models\\User\\User', 1, 'HussYana', '46365109756973f92b8f0f07175cf9271ed29d5973de686fd944d50181f3e3f9', '[\"*\"]', '2025-03-21 12:33:06', '2025-03-22 12:32:58', '2025-03-21 12:32:58', '2025-03-21 12:33:06'),
(12, 'App\\Models\\User\\User', 2, 'HussYana', '5d24bcf91e9b6a85550b0cba0e2c51451e4c315c945d91262762d95dee17fea1', '[\"*\"]', '2025-03-21 12:35:38', '2025-03-22 12:35:32', '2025-03-21 12:35:32', '2025-03-21 12:35:38'),
(13, 'App\\Models\\User\\User', 1, 'HussYana', '7cb4885fc9bec9ac913495509594f745a1aef2d08ba17025850c0ba43bca38c9', '[\"*\"]', NULL, '2025-03-22 12:37:29', '2025-03-21 12:37:29', '2025-03-21 12:37:29'),
(14, 'App\\Models\\User\\User', 1, 'HussYana', 'e26eaca2c7df7d23cf45dabe16f8afbe95969d2b2f893db64fad7c46047e25c6', '[\"*\"]', '2025-03-21 12:45:24', '2025-03-22 12:41:42', '2025-03-21 12:41:42', '2025-03-21 12:45:24');

-- --------------------------------------------------------

--
-- Table structure for table `submission_requests`
--

CREATE TABLE `submission_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `employee_id` bigint(20) UNSIGNED NOT NULL,
  `document_title` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ACTIVE',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

CREATE TABLE `uploads` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `employee_id` bigint(20) UNSIGNED NOT NULL,
  `document_title` varchar(255) NOT NULL,
  `document` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `account_type` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `email_verified_at`, `password`, `account_type`, `remember_token`, `created_at`, `updated_at`, `status`) VALUES
(1, 'hillaryokello19@gmail.com', NULL, '$2y$10$4hTtjJbeuBUI0h4LkDWpX.2Ko/uuuk57JdhdUZ6OOn6QGFUxB/CEq', 'ADMIN', NULL, NULL, NULL, 'ACTIVE'),
(2, 'hillaryokello12@gmail.com', NULL, '$2y$10$4hTtjJbeuBUI0h4LkDWpX.2Ko/uuuk57JdhdUZ6OOn6QGFUxB/CEq', 'EMPLOYER', NULL, '2025-03-21 09:50:04', '2025-03-21 09:50:04', 'ACTIVE'),
(3, 'hillaryokello1@gmail.com', NULL, '$2y$10$WlNv.q5qRVZ/rWXbA5fg8ugJ2MT73SWjjyjiVpSPPQi6IKc8CQvke', 'EMPLOYER', NULL, '2025-03-21 10:20:48', '2025-03-21 10:20:48', 'ACTIVE');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admins_user_id_foreign` (`user_id`);

--
-- Indexes for table `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `candidates_email_unique` (`email`),
  ADD KEY `candidates_organization_id_foreign` (`organization_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employees_employer_id_foreign` (`employer_id`);

--
-- Indexes for table `employers`
--
ALTER TABLE `employers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employers_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `insurance_policies`
--
ALTER TABLE `insurance_policies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `insurance_policies_policy_number_unique` (`policy_number`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `organizations_name_unique` (`name`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `submission_requests`
--
ALTER TABLE `submission_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `submission_requests_employee_id_foreign` (`employee_id`);

--
-- Indexes for table `uploads`
--
ALTER TABLE `uploads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploads_employee_id_foreign` (`employee_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `candidates`
--
ALTER TABLE `candidates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employers`
--
ALTER TABLE `employers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `insurance_policies`
--
ALTER TABLE `insurance_policies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `submission_requests`
--
ALTER TABLE `submission_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `uploads`
--
ALTER TABLE `uploads`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `admins_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `candidates`
--
ALTER TABLE `candidates`
  ADD CONSTRAINT `candidates_organization_id_foreign` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`);

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_employer_id_foreign` FOREIGN KEY (`employer_id`) REFERENCES `employers` (`id`);

--
-- Constraints for table `employers`
--
ALTER TABLE `employers`
  ADD CONSTRAINT `employers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `submission_requests`
--
ALTER TABLE `submission_requests`
  ADD CONSTRAINT `submission_requests_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);

--
-- Constraints for table `uploads`
--
ALTER TABLE `uploads`
  ADD CONSTRAINT `uploads_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
