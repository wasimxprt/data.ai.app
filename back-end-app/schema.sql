CREATE DATABASE db_gsr;
USE db_gsr;

CREATE TABLE data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE,
  app VARCHAR(255),
  platform VARCHAR(255),
  country VARCHAR(255),
  ad_revenue DECIMAL(10, 2),
  impressions INT
);


INSERT INTO data (date, app, platform, country, ad_revenue, impressions)
VALUES
  ('2023-12-01', 'United Airlines', 'iOS', 'USA', 100.50, 1000),
  ('2023-11-02', 'Microsoft Teams', 'Android', 'Germany', 75.25, 500),
  ('2023-10-03', 'American Airlines', 'iOS', 'UK', 50.75, 800),
  ('2023-08-04', 'Tomb of the Mask', 'Android', 'France', 120.10, 1500),
  ('2023-07-05', 'Paramount', 'iOS', 'USA', 90.60, 1200);
  ('2023-01-05', 'WhatsApp Messenger', 'iOS', 'USA', 90.60, 1200);