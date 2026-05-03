-- Job Portal Database Setup
-- Run this script to create the database

CREATE DATABASE IF NOT EXISTS job_portal_db;
USE job_portal_db;

-- Tables are auto-created by Hibernate (spring.jpa.hibernate.ddl-auto=update)
-- This script just creates the database and a dedicated user

-- Optional: create a dedicated DB user (replace password as needed)
-- CREATE USER 'jobportal_user'@'localhost' IDENTIFIED BY 'jobportal_pass';
-- GRANT ALL PRIVILEGES ON job_portal_db.* TO 'jobportal_user'@'localhost';
-- FLUSH PRIVILEGES;

-- After running the application, you can verify tables with:
-- SHOW TABLES;
-- DESCRIBE users;
-- DESCRIBE jobs;
-- DESCRIBE applications;
