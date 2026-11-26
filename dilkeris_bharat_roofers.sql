-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 26, 2026 at 10:56 AM
-- Server version: 10.6.28-MariaDB
-- PHP Version: 8.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `siarasys_siaraprop`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `phone`, `password`) VALUES
(1, 'mohit', 'ad201054@gmail.com', '5678904', '$2y$10$LbrUNmZK/YTsuuuZLOydIeG8VJTjChgEBJqRKUP3QM/7iHlNX5RrG'),
(2, 'rahul', 'rahul@gmail.com', '9806324244', '$2a$10$Rhv2bb5x9khAN4gIVR.JKewQTkz/eaM./GqYhgYwMksBfN4UutSeq'),
(3, 'dev', 'dev@gmail.com', '9806324244', '$2a$10$Yl90ER3M4dXuHD/zAFSD7uSfwineEL9V.1t5XIrA8WixnquJ.oaCO'),
(4, 'Mohit Sahu', 'mohitsahu1993@gmail.com', '9806324244', '$2a$10$9a4nDXn7DNAx8foTLjViOufuRRlg4uVVi2PnlSX8lBLJTm2jmcJ86'),
(5, 'Anil Rajak', '1999anilrajak@gmail.com', '8839280515', '$2a$10$zvuIQ5PiaLivimxOTdpnh.vexZC3X/B/r6IWKxy4D3nAylpIBotwa');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `img_alt` varchar(255) DEFAULT '',
  `author` varchar(100) DEFAULT 'Siara Properties',
  `category` varchar(100) DEFAULT 'Real Estate',
  `meta_title` varchar(255) DEFAULT '',
  `meta_description` text DEFAULT NULL,
  `canonical_url` varchar(500) DEFAULT '',
  `views` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `slug`, `description`, `image`, `img_alt`, `author`, `category`, `meta_title`, `meta_description`, `canonical_url`, `views`, `created_at`, `updated_at`) VALUES
(6, 'Real Estate Consultant in Jabalpur', 'real-estate-consultant-in-jabalpur', '<h2>Find the Right Property with Expert Guidance</h2><p>Finding the right property is an important financial decision. Whether you are looking for a residential property for your family, commercial properties for business, plots for sale in Jabalpur, or farm land for investment, having the right real estate guidance can make the process easier and more secure.</p><p>A reliable <a href=\"https://siaraproperties.com/\" rel=\"noopener noreferrer\" target=\"_blank\">Real Estate Consultant in Jabalpur</a> can help buyers understand property options, compare locations, evaluate requirements, and make informed real estate decisions. Siara Properties provides property-related assistance for buyers looking for residential, commercial, land, and investment opportunities in Jabalpur.</p><h2>Why Choose a Real Estate Consultant in Jabalpur?</h2><p>The Jabalpur real estate market includes different types of properties, locations, budgets, and investment opportunities. Searching independently can sometimes make it difficult to identify the right property.</p><p>A professional Real Estate Consultant in Jabalpur can help you:</p><ul><li>Identify properties according to your budget and requirements</li><li>Explore residential and commercial property options</li><li>Find suitable plots and land</li><li>Compare property locations</li><li>Understand property-related documentation</li><li>Evaluate potential investment opportunities</li><li>Save time during the property-search process</li><li>Connect with suitable sellers or property owners</li></ul><p>With professional assistance, buyers can make property decisions with greater confidence.</p><h2>Property Dealer in Jabalpur for Residential and Commercial Properties</h2><p>A trusted <a href=\"https://siaraproperties.com/about\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>Property Dealer in Jabalpur</strong></a> can help buyers explore different property categories according to their needs.</p><p>Whether you want a home for your family, a property for business, or a property for investment, the right property dealer can help you identify suitable options.</p><h3>Residential Properties in Jabalpur</h3><p>For people planning to purchase a home, Residential Properties in Jabalpur can include apartments, independent houses, villas, and other residential options.</p><p>Before purchasing a residential property, buyers should consider:</p><ul><li>Location and connectivity</li><li>Nearby schools and hospitals</li><li>Road and transportation facilities</li><li>Local amenities</li><li>Property size and layout</li><li>Construction quality</li><li>Parking availability</li><li>Future development of the area</li><li>Overall budget</li></ul><p>A <strong>Real Estate Consultant in Jabalpur</strong> can help buyers compare these factors before selecting a property.</p><h2>Commercial Properties in Jabalpur</h2><p>For business owners and investors, <a href=\"https://siaraproperties.com/about\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>Commercial Properties in Jabalpur</strong></a> can provide opportunities for offices, shops, commercial buildings, and other business-related requirements.</p><p>When selecting commercial property, location is particularly important. Buyers should consider accessibility, surrounding businesses, customer movement, parking, road connectivity, and future development.</p><p>Working with an experienced Property Dealer in Jabalpur can help businesses identify commercial property options according to their business requirements.</p><h2>Plots for Sale in Jabalpur</h2><p>Buying land can be an attractive option for people who want to construct a home or consider long-term property investment.</p><p>If you are searching for Plots for Sale in Jabalpur, it is important to evaluate the location, plot size, road access, surrounding development, ownership documents, and applicable approvals before making a purchase.</p><p>A professional Real Estate Consultant in Jabalpur can help you explore available plot options based on your budget and intended use.</p><h2>Farm Land for Sale in Jabalpur</h2><p>People looking for larger land parcels or properties away from the city may search for Farm Land for Sale in Jabalpur.</p><p>Farm land can be considered for agricultural use, personal purposes, or certain investment objectives, depending on the property\'s location and applicable regulations.</p><p>Before purchasing farm land, buyers should carefully verify:</p><ul><li>Ownership records</li><li>Land-use classification</li><li>Access road</li><li>Location and boundaries</li><li>Water availability</li><li>Electricity availability</li><li>Applicable local regulations</li><li>Required permissions and documentation</li></ul><p>A reliable Property Dealer in Jabalpur can help buyers identify suitable farm land options and understand the basic property details before proceeding.</p><h2>Agricultural Land for Sale in Jabalpur</h2><p>If your requirement is specifically agricultural, searching for <a href=\"https://siaraproperties.com/about\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>Agricultural Land for Sale in Jabalpur</strong></a> can help you find land intended for agricultural purposes.</p><p>However, agricultural land transactions can involve specific legal and land-use requirements. Buyers should verify the property\'s records, classification, ownership, boundaries, and permitted use before making any financial commitment.</p><p>Professional guidance from a Real Estate Consultant in Jabalpur can help buyers understand the property information they need to check.</p><h2>How to Find the Best Property in Jabalpur?</h2><p>Searching for the Best Property in Jabalpur does not simply mean choosing the most expensive property. The best property is one that matches your purpose, budget, location preference, and long-term requirements.</p><p>Consider these factors before purchasing:</p><h4>1. Choose the Right Location</h4><p>Location can influence accessibility, convenience, property demand, and future development.</p><h4>2. Define Your Budget</h4><p>Decide your purchase budget before starting your property search. Also consider registration, taxes, documentation, maintenance, and other applicable expenses.</p><h4>3. Decide the Property Type</h4><p>Determine whether you need a residential property, commercial property, plot, farm land, or agricultural land.</p><h4>4. Verify Property Documents</h4><p>Property ownership and relevant documents should be carefully verified before completing a transaction.</p><h4>5. Consider Future Potential</h4><p>Look at connectivity, infrastructure, surrounding development, and other factors that may influence the property\'s future suitability.</p><h4>6. Take Professional Guidance</h4><p>A qualified Real Estate Consultant in Jabalpur can help you compare available options and make the property-search process more organized.</p><h2>Why Choose Siara Properties?</h2><p>Siara Properties assists buyers searching for different types of properties in Jabalpur. Whether you are searching for Plots for Sale in Jabalpur, Farm Land for Sale in Jabalpur, Agricultural Land for Sale in Jabalpur, Residential Properties in Jabalpur, or Commercial Properties in Jabalpur, professional property guidance can help you find options according to your requirements.</p><p>As a Real Estate Consultant in Jabalpur and Property Dealer in Jabalpur, Siara Properties focuses on helping customers explore property opportunities based on location, budget, property type, and purpose.</p><h2>Final Summary</h2><p>Choosing the right property requires proper research, location analysis, budget planning, and document verification. From Residential Properties in Jabalpur and Commercial Properties in Jabalpur to Plots for Sale in Jabalpur, Farm Land for Sale in Jabalpur, and Agricultural Land for Sale in Jabalpur, buyers have different options depending on their requirements.</p><p>If you are searching for the <a href=\"https://siaraproperties.com/about\" rel=\"noopener noreferrer\" target=\"_blank\">Best Property in Jabalpur</a>, connecting with a professional Real Estate Consultant in Jabalpur and experienced Property Dealer in Jabalpur can make your property search more convenient and informed.</p><h2>Frequently Asked Questions</h2><h5>1. What does a Real Estate Consultant in Jabalpur do?</h5><p>A Real Estate Consultant in Jabalpur helps buyers explore suitable residential, commercial, land, and investment property options according to their requirements.</p><h4>2. How can I find Plots for Sale in Jabalpur?</h4><p>You can contact a reliable Property Dealer in Jabalpur to explore available plots based on location, size, budget, and intended use.</p><h4>3. Is farm land available for sale in Jabalpur?</h4><p>Farm Land for Sale in Jabalpur may be available in different locations. Buyers should verify ownership, land classification, access, and applicable regulations before purchasing.</p><h4>4. What should I check before buying Agricultural Land in Jabalpur?</h4><p>Check ownership records, land classification, boundaries, access, permitted land use, and relevant documentation before making a purchase.</p><h4>5. Can a consultant help with Commercial Properties in Jabalpur?</h4><p>Yes. A Real Estate Consultant in Jabalpur can help buyers explore commercial property options according to business requirements, location preferences, and budget.</p>', '1786185555494-siara 11.png', 'sell property in jabalpur', 'sandeep', 'Real Estate', 'Find Your Dream Property in Jabalpur | Siara Properties', 'Find plots, farm land, agricultural land, and residential or commercial properties in Jabalpur with trusted guidance from Siara Properties. Contact us today.', 'https://siaraproperties.com/blog/real-estate-consultant-in-jabalpur', 49, '2026-08-08 10:39:15', '2026-11-19 14:45:11'),
(8, 'Selling Property in Jabalpur? Here\'s How to Get the Best Value for Your Land', 'selling-property-in-jabalpur-here-s-how-to-get-the-best-value-for-your-land', '<p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Selling a property is a big decision — and often a more stressful one than buying. You\'re not just handing over land; you\'re closing a chapter, and you want to make sure you get what it\'s truly worth. Yet many property owners in Jabalpur end up settling for less than fair value, simply because they don\'t have the right guidance or access to genuine buyers.</span></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Whether you\'re sitting on a residential plot you no longer need, a piece of farm land, an old family house, or a shop that\'s been lying vacant, this blog will walk you through how to sell it the right way — and why working with an experienced </span><a href=\"https://siaraproperties.com/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 0); background-color: transparent;\"><strong>Property Dealer in Jabalpur</strong></a><span style=\"color: rgb(0, 0, 0); background-color: transparent;\"> makes the entire process faster, safer, and more profitable.</span></p><h2><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Why Selling Property in Jabalpur Isn\'t as Simple as It Looks</strong></h2><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">On paper, selling sounds easy: find a buyer, agree on a price, sign the papers. In reality, sellers often face:</span></p><ul><li><span style=\"background-color: transparent;\">Buyers who negotiate hard because they sense the seller is unsure of the market rate</span></li><li><span style=\"background-color: transparent;\">Long delays because there\'s no steady stream of genuine, ready buyers</span></li><li><span style=\"background-color: transparent;\">Confusion around documentation — old registries, unclear mutation records, or pending dues</span></li><li><span style=\"background-color: transparent;\">Middlemen who add extra costs without adding real value</span></li></ul><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">A trusted </span><a href=\"https://siaraproperties.com/services\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 0); background-color: transparent;\"><strong>Real Estate Consultant in Jabalpur</strong></a><span style=\"color: rgb(0, 0, 0); background-color: transparent;\"> removes most of this friction by bringing verified buyers, accurate pricing knowledge, and complete documentation support to the table.</span></p><h2><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Selling Plots in Jabalpur</strong></h2><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">If you own a </span><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">plot </strong><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">in a growing area of Jabalpur — say Vijay Nagar, Ranjhi, or Gorakhpur — chances are its value has increased significantly since you first purchased it. But pricing it right is the tricky part. Price it too high, and it sits unsold for months. Price it too low, and you leave money on the table.</span></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">To sell a plot at the right price, it helps to:</span></p><ul><li><span style=\"background-color: transparent;\">Get a proper market valuation based on recent nearby transactions</span></li><li><span style=\"background-color: transparent;\">Keep all documents ready — registry, mutation, and diversion papers, if applicable</span></li><li><span style=\"background-color: transparent;\">Highlight nearby development — schools, roads, or commercial projects coming up</span></li><li><span style=\"background-color: transparent;\">List with a dealer who already has interested buyers in that zone</span></li></ul><h2><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Selling Farm Land in Jabalpur</strong></h2><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Farm land around Jabalpur has become increasingly attractive to buyers looking for weekend homes, retirement retreats, or long-term investment. If you own farm land you\'re ready to part with, timing and presentation matter a lot.</span></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Points that help you sell farm land faster:</span></p><ul><li><span style=\"background-color: transparent;\">Clear access roads and proximity to the main highway boost buyer interest</span></li><li><span style=\"background-color: transparent;\">Availability of water sources adds real value</span></li><li><span style=\"background-color: transparent;\">Clean, updated land records speed up the deal significantly</span></li><li><span style=\"background-color: transparent;\">Genuine buyer connects — many farm land deals fall through simply because the seller never reaches the right audience</span></li></ul><h2><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Selling Agricultural Land in Jabalpur</strong></h2><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Agricultural land sales come with their own set of legal considerations — diversion status, land ceiling rules, and buyer eligibility, among others. Owners often struggle here not because their land isn\'t valuable, but because they don\'t know how to present it correctly to serious buyers.</span></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Before listing agricultural land for sale, make sure:</span></p><ul><li><span style=\"background-color: transparent;\">The land\'s current classification (agricultural vs. diverted) is clearly known</span></li><li><span style=\"background-color: transparent;\">Soil quality and irrigation access are documented — buyers ask about this often</span></li><li><span style=\"background-color: transparent;\">All ownership records are updated and free of disputes</span></li><li><span style=\"background-color: transparent;\">You\'re working with someone who understands local land laws, so the sale doesn\'t get stuck midway</span></li></ul><h2><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Selling Commercial Properties in Jabalpur</strong></h2><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Owners of commercial properties — shops, office spaces, or showrooms — often underestimate how much location and footfall history matter to a buyer. A well-documented history of rental income or business activity can significantly increase what a buyer is willing to pay.</span></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">To get the best price for commercial property:</span></p><ul><li><span style=\"background-color: transparent;\">Prepare a clear picture of rental yield or business potential, if applicable</span></li><li><span style=\"background-color: transparent;\">Keep NOC, tax receipts, and ownership papers organised</span></li><li><span style=\"background-color: transparent;\">Highlight the area\'s commercial growth — new businesses, footfall trends, connectivity</span></li><li><span style=\"background-color: transparent;\">Reach buyers who are specifically looking for commercial investment, not just any property</span></li></ul><h2><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Selling Residential Properties in Jabalpur</strong></h2><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">For residential properties — independent houses, flats, or builder floors — presentation and pricing go hand in hand. Buyers in this segment are often end-users, so factors like neighbourhood safety, nearby schools, and the condition of the house matter as much as the price tag.</span></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">A few things that help residential properties sell faster:</span></p><ul><li><span style=\"background-color: transparent;\">Minor repairs and a clean, well-maintained appearance</span></li><li><span style=\"background-color: transparent;\">Clear title with no legal encumbrances</span></li><li><span style=\"background-color: transparent;\">Realistic pricing based on comparable sales in the same locality</span></li><li><span style=\"background-color: transparent;\">Access to genuine buyers actively searching, not just casual browsers</span></li></ul><h2><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Getting the Best Value for Your Property in Jabalpur</strong></h2><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">No matter what type of property you\'re selling, one thing stays constant — sellers get the best outcomes when they have access to genuine, ready buyers and someone who understands the local market inside out. This is exactly where working with an established name makes a real difference.</span></p><h2><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Why Sell Through Siara Properties?</strong></h2><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">At Siara Properties, we work closely with property owners across Jabalpur — helping them sell plots, farm land, agricultural land, commercial spaces, and residential properties at fair, well-researched prices. Our approach focuses on:</span></p><ul><li><strong style=\"background-color: transparent;\">Accurate market valuation</strong><span style=\"background-color: transparent;\"> so you never undersell</span></li><li><strong style=\"background-color: transparent;\">Verified buyer network</strong><span style=\"background-color: transparent;\">, which means faster closures</span></li><li><strong style=\"background-color: transparent;\">Complete documentation support</strong><span style=\"background-color: transparent;\">, from listing to registry</span></li><li><strong style=\"background-color: transparent;\">Transparent process</strong><span style=\"background-color: transparent;\"> with no hidden costs or middlemen games</span></li></ul><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">If you\'re ready to sell your property in Jabalpur and want it done right — without the usual stress and delays — visit</span><a href=\"https://siaraproperties.com/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 0); background-color: transparent;\"> </a><a href=\"https://siaraproperties.com/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(17, 85, 204); background-color: transparent;\">siaraproperties.com</a><span style=\"color: rgb(0, 0, 0); background-color: transparent;\"> or get in touch with our team directly.</span></p><h3><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Conclusion</strong></h3><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Selling property doesn\'t have to be a long, uncertain process. With the right pricing, proper documentation, and access to genuine buyers, you can close a fair deal without unnecessary delays or compromises.</span></p><p><span style=\"color: rgb(0, 0, 0); background-color: transparent;\">Whether it\'s a plot, farm land, agricultural land, or a commercial or residential property, Siara Properties is here to help you sell smart and sell well.</span></p><p><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">Ready to sell your property in Jabalpur? Connect with </strong><a href=\"https://siaraproperties.com/contact\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 0); background-color: transparent;\"><strong>Siara Properties today</strong></a><strong style=\"color: rgb(0, 0, 0); background-color: transparent;\">.</strong></p>', '1789822269805-Property Dealer in Jabalpur.jpeg', 'Selling Property in Jabalpur', 'mohit', 'Real Estate', 'Sell Property in Jabalpur | Plots, Farm Land & Commercial Property', 'Sell your plot, farm land or commercial property in Jabalpur at the best price with Siara Properties. Quick, safe deals at true market value. ', 'https://siaraproperties.com/blog/selling-property-in-jabalpur-here-s-how-to-get-the-best-value-for-your-land', 30, '2026-09-19 12:51:09', '2026-11-23 18:55:44'),
(10, 'Best Property in Jabalpur | Plots, Land and Homes', 'best-property-in-jabalpur-plots-land-and-homes', '<p>Jabalpur has quietly become one of the most promising real estate markets in Madhya Pradesh. With good connectivity, educational institutions, a strong defence and industrial presence, and the Narmada River nearby, the city offers both a good quality of life and solid investment potential. Whether you want a plot to build your dream home, a flat for your family, or agriculture land as a long-term asset, finding the best property in Jabalpur starts with choosing the right location.</p><p>At <a href=\"https://siaraproperties.com/\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>Siara Properties</strong></a>, we help buyers and investors find verified, well-located properties across the city. In this guide, we break down the most promising areas and property types, so you can decide with confidence.</p><h3>Why Invest in Property in Jabalpur?</h3><p>Property in Jabalpur is attractive for several reasons:</p><ul><li><strong>Affordable entry prices</strong> compared to metro cities, with room for appreciation.</li><li><strong>Strong infrastructure</strong>, including rail, road and air connectivity.</li><li><strong>Stable demand</strong> from government employees, defence personnel, students and professionals.</li><li><strong>Natural beauty</strong>, with the Narmada River, Marble Rocks and green surroundings improving living standards.</li><li><strong>Expanding city limits</strong>, which open new residential and commercial zones every year.</li></ul><p>Whether you are a first-time buyer or a seasoned investor, Jabalpur offers options at almost every budget.</p><h3>Plots in Jabalpur: A Smart Start</h3><p>Buying a plot is one of the most popular ways to invest. <a href=\"https://siaraproperties.com/property/propertyType/plot\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>Plots in Jabalpur</strong></a> give you flexibility: build immediately, or hold the land and let its value grow as the area develops.</p><p>When choosing a plot, look at:</p><ul><li>Proximity to main roads, schools, hospitals and markets</li><li>Clear title and registry documents</li><li>Approval status of the layout or colony</li><li>Water, electricity and drainage availability</li><li>Future development plans in the area</li></ul><p>Plots in developing zones often give the best appreciation, while plots in established areas offer immediate livability.</p><h3>Residential Property in Jabalpur</h3><p>The demand for residential property in Jabalpur keeps growing as families look for safe, well-connected neighbourhoods. Independent houses, villas, flats and row houses are all available, depending on your budget and lifestyle.</p><p>Look for localities with good civic amenities, low traffic congestion, nearby educational institutions and healthcare access. Properties in well-planned colonies also tend to resell faster and hold their value better.</p><h3>Agriculture Land in Jabalpur: A Long-Term Asset</h3><p>If you prefer a stable, long-term investment, agricultural land in Jabalpur is worth serious consideration. The region’s fertile soil and water availability make it suitable for farming, and land near the city is also attractive for future development.</p><p>Benefits of agriculture land include:</p><ul><li>Lower purchase cost per square foot than urban plots</li><li>Steady appreciation, especially near expanding city limits</li><li>Options for farmhouses, orchards or farming income</li><li>A tangible asset that is relatively stable over the long term</li></ul><p>Before buying, always verify the land record (khasra and khatauni), the ownership history, and whether the land use can be converted if you plan non-agricultural use.</p><h3>Best Property in Jabalpur by Location</h3><p>Here is a quick look at the key localities our clients ask about most.</p><h4>Best Property in Garha, Jabalpur</h4><p>Garha is one of the busiest and most established areas of the city, with markets, schools, hospitals and daily-needs shopping close by. The <a href=\"https://siaraproperties.com/property/propertyType/house\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>best property in Garha, Jabalpur</strong></a> suits families who want convenience and strong resale demand. Both residential flats and plots are available, and connectivity to other parts of the city is excellent.</p><h4>Best Property in Purva Garha, Jabalpur</h4><p>Purva Garha is gaining attention for its developing residential pockets and relatively calmer surroundings. The best property in Purva Garha, Jabalpur is ideal for buyers who want proximity to Garha’s facilities without the heavier crowds. It is a good choice for mid-range homes and plots with growth potential.</p><h4>Best Property in Dhanvantri Nagar</h4><p>Dhanvantri Nagar is a well-known residential locality with an organised layout and good access to healthcare, education and transport. The best property in Dhanvantri Nagar appeals to families and retirees looking for a settled, comfortable neighbourhood.</p><h4>Best Property in Lamheta Ghat, Jabalpur</h4><p>Lamheta Ghat is known for its proximity to the Narmada and its peaceful setting. The best property in Lamheta Ghat, Jabalpur attracts buyers who value a calm environment, riverside surroundings and long-term appreciation. Plots and land parcels here suit both home builders and investors.</p><h4>Best Property in Sagda, Jabalpur</h4><p>Sagda is an emerging area with growing residential interest. The best property in Sagda, Jabalpur is attractive to buyers seeking affordable plots and early entry into a developing zone, where prices tend to rise as infrastructure improves.</p><h4>Best Property in Napier Town</h4><p>Napier Town is among Jabalpur’s most prestigious and centrally located areas, known for its wide roads, heritage character and proximity to key institutions. The best property in Napier Town suits buyers who want a premium address, excellent connectivity and strong long-term value.</p><h4>Best Property in Gwarighat</h4><p>Gwarighat combines riverside charm with strong residential demand. The best property in Gwarighat is popular for its scenic setting, accessibility and growing community. It works well for families and investors who want a mix of lifestyle and appreciation.</p><h3>Tips Before Buying Property in Jabalpur</h3><ol><li><strong>Verify documents.</strong> Check the title deed, registry, mutation and tax receipts.</li><li><strong>Visit the site.</strong> Photos can mislead, so see the property in person.</li><li><strong>Check approvals.</strong> Make sure the layout is approved by the relevant authority.</li><li><strong>Compare prices.</strong> Research recent deals in the same locality.</li><li><strong>Plan for the future.</strong> Consider upcoming roads, markets and other development.</li><li><strong>Work with a trusted agent.</strong> A reliable local partner can save you from costly mistakes.</li></ol><h3>Why Choose Siara Properties?</h3><p>Buying property is a big decision, and having the right guidance makes all the difference. Siara Properties offers:</p><ul><li>Verified listings across Jabalpur’s best localities</li><li>Transparent communication and honest advice</li><li>Help with plots, residential property and agriculture land</li><li>Support through documentation and the buying process</li><li>Options for different budgets and goals</li></ul><p>Our team understands the local market in depth, so you get practical advice instead of pressure.</p><h3>Conclusion</h3><p>From established areas like Napier Town and Garha to emerging zones like Sagda and Purva Garha, Jabalpur has something for every buyer. The key is matching the right property type and location to your goals, whether that is a family home, a plot for the future, or agriculture land for long-term growth.</p><p>Ready to find the <a href=\"https://siaraproperties.com/property/propertyType/flat\" rel=\"noopener noreferrer\" target=\"_blank\"><strong>best property in Jabalpur</strong></a>? Visit Siara Properties or get in touch with our team today. Let us help you turn your property goals into reality.</p>', '1794306630063-Best property in Jabalpur.webp', 'Best Property in Jabalpur | Plots, Land and Homes | Siara Properties', 'Siara Property ', 'Real Estate', 'Best Property in Jabalpur | Plots, Land and Homes', 'Jabalpur has quietly become one of the most promising real estate markets in Madhya Pradesh. With good connectivity, educational institutions, a strong defence', 'https://siaraproperties.com/blog/best-property-in-jabalpur-plots-land-and-homes', 13, '2026-11-10 10:30:30', '2026-11-26 09:23:02');

-- --------------------------------------------------------

--
-- Table structure for table `contacted_user`
--

CREATE TABLE `contacted_user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacted_user`
--

INSERT INTO `contacted_user` (`id`, `name`, `email`, `phone`, `message`, `created_at`) VALUES
(1, 'rahul', 'rahul@gmail.com', '9856325698', 'ok', '2023-12-22 10:57:12'),
(11, 'Ad Dubay', 'ad201054@gmail.com', '9424399746', 'dfsdfsdfsdf', '2026-08-07 12:42:01'),
(12, 'Ad Dubay', 'ad201054@gmail.com', '9424399746', 'dfdfgdfgdfg', '2026-08-07 12:42:43'),
(13, 'yryrtyrty', 'ad201054@gmail.com', '9424399746', 'yrtyrtyrty', '2026-08-07 12:43:02'),
(14, 'Ad Dubay', 'ad201054@gmail.com', '9424399746', 'fgjtghjghj', '2026-08-07 13:03:18');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_images`
--

CREATE TABLE `gallery_images` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `intrestedusers`
--

CREATE TABLE `intrestedusers` (
  `id` int(11) NOT NULL,
  `property_id` varchar(50) DEFAULT NULL,
  `PropertyName` varchar(1000) DEFAULT NULL,
  `userName` varchar(50) DEFAULT NULL,
  `userEmail` varchar(100) DEFAULT NULL,
  `userPhone` varchar(50) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `intrestedusers`
--

INSERT INTO `intrestedusers` (`id`, `property_id`, `PropertyName`, `userName`, `userEmail`, `userPhone`, `message`, `created_at`) VALUES
(1, '41', 'Mohit Apartment ', 'mohit', 'mohit@gmail.com', '9806324244', 'sdacas', '2023-12-27 11:44:36');

-- --------------------------------------------------------

--
-- Table structure for table `popup_leads`
--

CREATE TABLE `popup_leads` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `property_type` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `popup_leads`
--

INSERT INTO `popup_leads` (`id`, `name`, `phone`, `email`, `property_type`, `message`, `created_at`) VALUES
(3, 'Ashish Dubey', '9302300834', 'ashish9039062705@gmail.com', 'Commercial Property', 'sadsadsadsad', '2026-10-23 14:11:50');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `property_name` varchar(255) DEFAULT NULL,
  `property_location` varchar(1000) DEFAULT NULL,
  `property_address` varchar(255) DEFAULT NULL,
  `property_city` varchar(255) DEFAULT NULL,
  `property_description` varchar(1000) DEFAULT NULL,
  `property_type` varchar(50) DEFAULT NULL,
  `commercial_property_type` varchar(50) DEFAULT NULL,
  `tncp` varchar(255) DEFAULT NULL,
  `property_for` varchar(255) DEFAULT NULL,
  `property_video` varchar(1000) DEFAULT NULL,
  `rera` varchar(255) DEFAULT NULL,
  `bhk` varchar(10) DEFAULT NULL,
  `new_resale` varchar(10) DEFAULT NULL,
  `structure` varchar(50) DEFAULT NULL,
  `price` varchar(20) DEFAULT NULL,
  `square_ft` varchar(20) DEFAULT NULL,
  `dimension` varchar(20) DEFAULT NULL,
  `car_parking` varchar(50) DEFAULT NULL,
  `year_built` varchar(10) DEFAULT NULL,
  `facing` varchar(50) DEFAULT NULL,
  `furnishing` varchar(50) DEFAULT NULL,
  `carpet_area` varchar(20) DEFAULT NULL,
  `bathroom` varchar(10) DEFAULT NULL,
  `property_on_floor` varchar(10) DEFAULT NULL,
  `flooring` varchar(50) DEFAULT NULL,
  `age_of_property` varchar(10) DEFAULT NULL,
  `parking` varchar(50) DEFAULT NULL,
  `lift` varchar(50) DEFAULT NULL,
  `fall_ceiling` varchar(5) DEFAULT '0',
  `wallpaper` varchar(5) DEFAULT '0',
  `lights` varchar(5) DEFAULT '0',
  `fans` varchar(5) DEFAULT '0',
  `modularKitchen` varchar(15) DEFAULT '0',
  `road` varchar(5) DEFAULT '0',
  `drainage` varchar(5) DEFAULT '0',
  `roadLight` varchar(5) DEFAULT '0',
  `service_lift_available` varchar(5) DEFAULT '0',
  `common_visitor_parking` varchar(5) DEFAULT '0',
  `main_road_facing` varchar(5) DEFAULT '0',
  `working_24_7` varchar(5) DEFAULT '0',
  `good_ceiling_height` varchar(5) DEFAULT '0',
  `good_natural_light` varchar(5) DEFAULT '0',
  `attractive_entrance_gate` varchar(5) DEFAULT '0',
  `gated_community` varchar(5) DEFAULT '0',
  `immediate_possession` varchar(5) DEFAULT '0',
  `landscape_garden` varchar(5) DEFAULT '0',
  `water_supply_24_7` varchar(5) DEFAULT '0',
  `bore_well_water_24_7` varchar(5) DEFAULT '0',
  `environment_clearance_available` varchar(5) DEFAULT '0',
  `swimming_pool` varchar(5) DEFAULT '0',
  `terrace` varchar(5) DEFAULT '0',
  `air_conditioning` varchar(5) DEFAULT '0',
  `internet` varchar(5) DEFAULT '0',
  `balcony` varchar(5) DEFAULT '0',
  `cable_tv` varchar(5) DEFAULT '0',
  `computer` varchar(5) DEFAULT '0',
  `dishwasher` varchar(5) DEFAULT '0',
  `near_green_zone` varchar(5) DEFAULT '0',
  `near_temple` varchar(5) DEFAULT '0',
  `entry_gate` varchar(5) DEFAULT '0',
  `activity_area` varchar(5) DEFAULT '0',
  `security_24_7` varchar(5) DEFAULT '0',
  `long_term_investment` varchar(5) DEFAULT '0',
  `own_purpose` varchar(5) DEFAULT '0',
  `investment` varchar(5) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `youtube_link` varchar(1000) DEFAULT NULL,
  `visits` int(255) DEFAULT 0,
  `isSold` varchar(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `property_name`, `property_location`, `property_address`, `property_city`, `property_description`, `property_type`, `commercial_property_type`, `tncp`, `property_for`, `property_video`, `rera`, `bhk`, `new_resale`, `structure`, `price`, `square_ft`, `dimension`, `car_parking`, `year_built`, `facing`, `furnishing`, `carpet_area`, `bathroom`, `property_on_floor`, `flooring`, `age_of_property`, `parking`, `lift`, `fall_ceiling`, `wallpaper`, `lights`, `fans`, `modularKitchen`, `road`, `drainage`, `roadLight`, `service_lift_available`, `common_visitor_parking`, `main_road_facing`, `working_24_7`, `good_ceiling_height`, `good_natural_light`, `attractive_entrance_gate`, `gated_community`, `immediate_possession`, `landscape_garden`, `water_supply_24_7`, `bore_well_water_24_7`, `environment_clearance_available`, `swimming_pool`, `terrace`, `air_conditioning`, `internet`, `balcony`, `cable_tv`, `computer`, `dishwasher`, `near_green_zone`, `near_temple`, `entry_gate`, `activity_area`, `security_24_7`, `long_term_investment`, `own_purpose`, `investment`, `created_at`, `youtube_link`, `visits`, `isSold`) VALUES
(69, 'Nakshtra nagar ', NULL, 'katangi bypass near jain mandir', 'jabalpur', 'Nakshtra Nagar  fully furnished Duplex Property – Katangi Bypass   Discover the charm of modern living at **Nakshtra Nagar Duplex**, located on Katangi Bypass. This beautifully designed duplex offers a smart and elegant elevation, spacious balconies, ample natural light, and a welcoming entrance that creates a warm first impression. Thoughtfully planned for comfortable family living, the property combines contemporary design with practical spaces for everyday life. The clean exterior, attractive colour palette, and well-defined layout give this home a sophisticated appeal. Presented by **Siara**, this property is an excellent choice for families looking for a stylish home in a well-connected location. **Property dealer in Jabalpur** can help you explore this opportunity further.', 'house', '', 'no', 'sale', '', '', '4', 'resale', 'Duplex', '51 lakhs', '690', '0', 'yes', '2021', 'south facing', 'Full Furnished', '1480', '4', '2 floor', '2 floor', '4 years', 'yes', 'no', '1', '0', '1', '1', 'Full Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-09-24 12:03:37', NULL, 14, '0'),
(70, 'Nakshtra Nagar', NULL, 'Katangi bypass near jain mandir', 'Jabalpur', 'Nakshtra Nagar Duplex Property – Katangi Bypass   Discover the charm of modern living at **Nakshtra Nagar Duplex**, located on Katangi Bypass. This beautifully designed duplex offers a smart and elegant elevation, spacious balconies, ample natural light, and a welcoming entrance that creates a warm first impression. Thoughtfully planned for comfortable family living, the property combines contemporary design with practical spaces for everyday life. The clean exterior, attractive colour palette, and well-defined layout give this home a sophisticated appeal. Presented by **Siara**, this property is an excellent choice for families looking for a stylish home in a well-connected location. **Property dealer in Jabalpur** can help you explore this opportunity further.', 'house', '', 'no', 'sale', '', '', '4', 'resale', 'Duplex', '50 lakhs', '690', '0', 'yes', '2021', 'south facing', 'Semi Furnished', '1480', '4', '2 floor', '2 floor', '4 years', 'yes', 'no', '0', '0', '0', '0', 'Non Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-09-24 12:24:43', NULL, 10, '0'),
(71, 'STAR CITY', NULL, 'Karmeta ', 'jabalpur', 'Discover Vidit Fortune, a beautifully designed duplex located in the sought-after area of Karmeta, Jabalpur. Featuring a modern elevation, elegant colour palette, spacious balconies, stylish glass railings, and a well-designed entrance, this home offers a perfect blend of contemporary style and everyday comfort. The thoughtfully planned layout provides ample space for family living, while the attractive interiors and quality finishes add to its overall appeal. With its impressive frontage and practical design, Vidit Fortune is an ideal choice for families looking for a modern home in Jabalpur. Siara Properties, a trusted property dealer in Jabalpur, presents this attractive residential opportunity', 'house', '', 'yes', 'sale', '', '0', '4', 'new', 'Duplex', '1.10 crore', '1350 sqft', '0', 'yes', ' ', '0', 'Semi Furnished', '2800', '4', '2', '2', 'new constr', 'yes', 'no', '1', '0', '1', '0', 'Full Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '1', '0', '1', '1', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-09-24 12:47:08', NULL, 10, '1'),
(75, 'Kachnar Sambhar', NULL, 'Napier Town', 'jabalpur', 'Kachnar Sambhar Luxury Fully Furnished Flat – Napier Town   Experience comfortable and refined urban living with this **luxurious fully furnished flat in Kachnar Sambhar, Napier Town**. Thoughtfully designed with good ceiling height, abundant natural light, elegant interiors, air conditioning, fans, stylish lighting, and a spacious balcony, this home offers both comfort and convenience. The gated community features attractive entrance areas, landscaped gardens, ample visitor parking, 24/7 water supply, security, road lighting, and well-maintained infrastructure. Additional amenities include a terrace, dishwasher, and activity area, with a temple nearby. Offering immediate possession, this property is ideal for premium family living and **long-term investment**. Explore this opportunity with **Siara Properties, your trusted property dealer in Jabalpur**.', 'flat', '', 'no', 'sale', '', '', '3', 'resale', 'Triplex', '1.60 crore', '2200', '0', 'yes', '2011', 'south facing', 'Full Furnished', '2600sqft', '3', '5', '5', '15 year', 'yes', 'yes', '0', '0', '1', '1', 'Full Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '1', '1', '1', '0', '1', '0', '1', '1', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-09-24 13:32:08', NULL, 27, '0'),
(76, 'Goldern Avenu', NULL, 'Bilhari', 'Jabalpur', 'Step into comfortable and modern living with Golden Avenue Duplex, Bilhari, Jabalpur—a property designed for families who value space, convenience, and a peaceful neighbourhood. Its appealing location and residential surroundings make it an ideal choice for those looking to upgrade their lifestyle or make a smart property investment. Whether you are searching for your dream home or exploring opportunities in Jabalpur real estate, Siara Property can help you find the right option. As a trusted property dealer in Jabalpur, we also offer Plots for Sale in Jabalpur and Farm Land for Sale in Jabalpur for buyers seeking residential or investment opportunities.', 'house', '', 'yes', 'sale', '', '0', '3', 'new', 'Duplex', '75 lakhs ', '900 sqft', '20 X 45', 'Yes', 'Under cons', 'east facing', 'Not Furnished', '0', '3', '1', '2', 'Under cons', 'yes', 'no', '0', '0', '0', '0', 'Full Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '0', '1', '1', '0', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-09-25 06:31:06', NULL, 7, '0'),
(77, 'DUPLEX TILHERI ', NULL, 'Tilhari', 'Jabalpur', ' Rajul Township, a thoughtfully designed duplex property located in the peaceful and well-connected area of Tilhari. With its attractive elevation, spacious layout, elegant balconies, and well-planned exterior, this home offers a perfect blend of comfort and contemporary living. The property is designed to provide a warm and welcoming atmosphere for families, with ample natural light and practical spaces for everyday life. Its modern appearance and residential surroundings make it an excellent choice for those looking to own a beautiful home in Jabalpur. Siara, your trusted property dealer in Jabalpur, brings this appealing residential opportunity for families seeking quality ', 'house', '', 'yes', 'sale', '', '', '3', 'resale', 'Duplex', '76 lakhs ', '960 sqft', '20X48', 'Yes', '2022', 'east facing', 'Semi Furnished', '0', '3', '1', '2', '4 YEAR', 'yes', 'no ', '0', '0', '0', '0', 'Semi Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '0', '0', '1', '0', '1', '1', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '0', '0', '0', '1', '1', '1', '1', '2026-09-25 06:50:48', NULL, 10, '0'),
(78, ' Goldern Avenu ', NULL, 'Bilhari', 'Jabalpur ', 'Discover a thoughtfully designed Golden Avenue Singlex in Bilhari, Jabalpur, ideal for families looking for a comfortable home in a peaceful and well-connected locality. With its practical layout, welcoming residential surroundings, and convenient location, this property offers a balanced combination of everyday comfort and long-term value. Whether you are planning to settle with your family or looking for a promising real estate opportunity, Golden Avenue Singlex is worth exploring. Siara Property brings you carefully selected properties across Jabalpur to match different needs and budgets. Along with being a trusted property dealer in Jabalpur, we also offer Plots for Sale in Jabalpur and Farm Land for Sale in Jabalpur.', 'house', '', 'yes', 'sale', '', '0', '2', 'new', 'Simplex', '65 lakhs ', '1000 sqft ', '0', 'Yes', '2026', '0', 'Not Furnished', '0', '2', '1', '1', 'New constr', 'yes', 'no', '0', '0', '0', '0', 'Full Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '0', '1', '1', '0', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-09-25 07:04:43', NULL, 13, '0'),
(79, 'Goldern Avenu ', NULL, 'Bilhari', 'JabalpuR', 'This residential plot at Golden Avenue, Bilhari offers an opportunity to create a home that truly matches your lifestyle and requirements. Set in a developing and well-connected locality, the plot can be considered by families planning to build their own house as well as buyers looking at real estate for long-term investment. Instead of adjusting to a ready-made layout, owning a plot gives you the freedom to plan your home your way. Siara Property helps you explore suitable property opportunities in Jabalpur', 'plot', '', 'yes', 'sale', '', '0', '', 'new', '', '4,400 - 4,600 per sq', '800 - 1000 sqft ', '0', '', '', 'east facing', '', '', '', '', '', '', '', '', '0', '0', '0', '0', '0', '1', '1', '1', '0', '0', '0', '0', '0', '1', '0', '1', '1', '1', '1', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '1', '1', '1', '1', '2026-09-25 07:08:16', NULL, 20, '0'),
(80, 'Shiv Parisar ', NULL, 'Near Khajri Bypass ', 'Jabalpur ', 'Shiv Parisar Plots, located near Khajri Bypass, offer an opportunity for buyers looking to secure land in a growing and well-connected area. Investing in a plot gives you the flexibility to build in the future or hold the property as a long-term asset, depending on your plans. With the right location, land can become a valuable part of your investment portfolio. Siara Property helps buyers explore suitable land and residential opportunities across Jabalpur. As a trusted property dealer in Jabalpur', 'plot', '', 'no', 'sale', '', '0', '', 'new', '', '750 - 800 per sqft ', '600-1000 sqft ', '0', '', '', ' East , West  facing ', '', '', '', '', '', '', '', '', '0', '0', '0', '0', '0', '1', '1', '1', '0', '0', '1', '0', '0', '1', '0', '1', '1', '1', '1', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '1', '1', '1', '2026-09-25 07:14:34', NULL, 10, '0'),
(81, 'Oswal ', NULL, 'Karmehta Road near amrit tirth jain mandir ', 'Jabalpur', 'Imagine having your own piece of land in a peaceful part of Jabalpur, where you can plan a home exactly the way you want. This plot near Amrit Teerth Jain Mandir presents an attractive opportunity for homebuyers and land investors seeking a promising location. Whether your vision is to build a comfortable family home or secure land for the future, this property gives you the freedom to decide when and how to develop it. With Siara Property, buyers can explore carefully selected real estate opportunities across the city,', 'plot', '', 'no', 'sale', '', '', '', 'resale', '', '2700 per sqft ', '1956 sqft ', '32.6X60 ', '', '', '0', '', '', '', '', '', '', '', '', '0', '0', '0', '0', '0', '1', '1', '1', '0', '0', '0', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '1', '1', '1', '1', '2026-09-25 07:22:51', NULL, 9, '0'),
(82, 'Shiv Parisar', NULL, 'Near Khajri Bypass', 'Jabalpur', 'Looking for a commercial property with added space Shiv Parisar Commercial Shop with Roof, located near Khajri Bypass, Jabalpur, offers an opportunity for business owners and investors looking for a strategically positioned commercial space. The shop can be suitable for different business requirements, while the additional roof area provides valuable flexibility for future use. Its location makes it worth considering for those planning to establish a business or add a commercial asset to their portfolio. Siara Property brings diverse real estate opportunities', 'commercial', 'shop', 'no', 'sale', '', '', '', 'new', '', '7 lakhs ', '156 sqft ', '12X13 ', 'Yes', '2024 ', 'south facing ', 'Semi Furnished', '150 ', '', '1', '1', '2 YEARS', 'yes', 'n0', '0', '0', '1', '0', '0', '1', '1', '1', '0', '1', '1', '0', '1', '1', '0', '0', '1', '0', '1', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '1', '1', '2026-09-25 07:30:14', NULL, 6, '0'),
(84, 'Gwarighat  bungalow', NULL, 'Gwarighat', 'Jabalpur', 'Discover a beautiful bungalow in Gwarighat, Jabalpur, offering a comfortable setting for families looking for a well-connected and peaceful place to call home. Located in one of Jabalpur’s familiar residential areas, this property combines everyday convenience with a pleasant neighbourhood environment. Whether you are planning to purchase a home for your family or looking for a valuable real estate investment, this bungalow is worth exploring. Siara Property helps buyers discover suitable residential and investment opportunities across Jabalpur. As a trusted property dealer in Jabalpur, we also offer options for Plots for Sale in Jabalpur , based on your requirements.', 'house', '', 'yes', 'sale', '', '0', '4', 'resale', 'Duplex', '3.50 crore ', '4230 sqft ', '0', 'yess', '2023 ', 'East /  West facing ', 'Semi Furnished', '2600', '6', '1', '2', '2 years ', 'yes ', 'no ', '1', '1', '1', '1', 'Full Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', '1', '0', '1', '1', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-09-25 08:56:15', NULL, 22, '0'),
(85, ' Ukhri Plot ', NULL, 'Near Ukhri petrol pump ', 'Jabalpur', 'Make your next property investment count with this promising plot located in Ukhri, Jabalpur. For buyers who value location, flexibility, and future possibilities, this plot offers the freedom to create a home or plan an investment according to their long-term goals. Ukhri is a familiar and well-established part of Jabalpur, making it an interesting option for those looking to own land within the city. Siara Property connects buyers with carefully selected real estate opportunities suited to different needs and budgets.Make your next property investment count with this promising plot located in Ukhri, Jabalpur. For buyers who value location, flexibility, and future possibilities, this plot offers the freedom to create a home or plan an investment according to their long-term goals. Ukhri is a familiar and well-established part of Jabalpur, making it an interesting option for those looking to own land within the city. Siara Property connects buyers with carefully selected real estate op', 'plot', '', 'no', 'sale', '', '0', '', 'resale', '', '7500 per sqft ', '2250 sqft', '32X70', '', '', '0', '', '', '', '', '', '', '', '', '0', '0', '0', '0', '0', '1', '1', '1', '0', '0', '0', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '1', '1', '1', '1', '2026-09-25 10:02:26', NULL, 8, '0'),
(86, '2BHK FLAT ', NULL, 'Near kachpura bridge ', 'Jabalpur', '2BHK FKAT  , located near Kachpura Bridge, Jabalpur, offers a well-designed ideal for families seeking comfort, convenience, and a well-connected location. The spacious layout provides a practical living experience with well-planned bedrooms and common areas, making it suitable for both family living and long-term investment. For buyers exploring Plots for Sale in Jabalpur, this location also presents attractive real estate opportunities. ', 'flat', '', 'no', 'sale', '', '', '2', 'resale', 'Simplex', '65 lakhs', '735 sqft', '0', 'yes', '2021', '0', 'Semi Furnished', '0', '2', '6', ' 0                                                ', '5 years ', 'yes', 'yes', '0', '0', '0', '0', 'Full Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '1', '1', '1', '0', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-09-25 10:15:37', NULL, 9, '0'),
(87, '1BHK FLAT', NULL, 'Near kachpura bridge', 'Jabalpur', 'Turn your dream of owning a comfortable home into reality with this attractive 1 BHK flat at Kachpura Bridge, Jabalpur. Designed for convenient and modern living, this home is an ideal choice for a couple, small family, working professional, or first-time homebuyer. The smartly planned layout provides a comfortable atmosphere while making good use of the available space. Its convenient location adds value to everyday living by keeping important city destinations within easy reach. If you are searching for a home that combines practicality, comfort, and location, this 1 BHK flat is worth a closer look. Contact Siara Property to explore this residential opportunity today.', 'flat', '', 'yes', 'sale', '', '0', '2', 'resale', 'Simplex', '25 lakhs ', '500sqft ', '0', 'yes', '2022', '0', 'Semi Furnished', '0', '1', '  2', '0', '5 years', ' yes', 'yes', '0', '0', '0', '0', 'Semi Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '0', '1', '1', '1', '0', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-09-25 10:22:42', NULL, 11, '0'),
(88, 'Bilheri Duplex                                                                                                                                                                                                                                                 ', NULL, 'Bilhari', 'Jabalpur', '3 BHK East-Facing Corner Duplex available for sale in a gated community. The property has a 1250 sq. ft. area, 3 bathrooms, car parking, terrace and balcony. It offers good natural light, 24/7 water supply, visitor parking, immediate possession and is TNCP approved.', 'house', '', 'yes', 'sale', '', '0', '3', 'resale', 'Duplex', '1.20 crore', '1250', '0', 'yes', ' 2024', 'East facing  corner ', 'Not Furnished', '1250', '3', '1', '2', '2 years', 'yes', 'no', '0', '0', '0', '0', 'Non Modular', '1', '1', '1', '0', '1', '0', '0', '0', '1', '1', '1', '1', '0', '1', '0', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-09-25 11:05:17', NULL, 25, '0'),
(89, 'Gorakhpur  Flat ', NULL, 'Gorakhpur ', 'Jabalpur', ' Siara Property presents an attractive Gorakhpur Flat, offering a practical and comfortable option for families, couples, working professionals, and first-time buyers. The property is thoughtfully suited for modern living and can be a valuable addition to your real-estate plans. With local knowledge and customer-focused service, Siara Property helps you explore properties according to your requirements. If you are searching for a trusted property dealer in Jabalpur, interested in Plots for Sale in Jabalpur, or exploring Farm Land for Sale in Jabalpur, our team can guide you through suitable opportunities. Connect with Siara Property to know more.', 'flat', '', 'no', 'sale', '', '0', '3', 'resale', 'Triplex', '95 lakhs ', '1100 sqft ', '0', 'yes', '2023', 'south facing ', 'Full Furnished', '1100 sqft ', '3', '3', '3', '2 YEARS', 'yes', 'yes ', '1', '1', '1', '1', 'Semi Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '1', '1', '1', '0', '1', '0', '1', '0', '0', '1', '1', '1', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-09-25 11:27:47', NULL, 12, '0'),
(90, 'Kanchan vihar ', NULL, 'Lamti ', 'jabalpur', 'Premium Corner Residential Plot in Krishna Bihar A rare opportunity to own a 2,587 sq. ft. premium corner plot in the well-positioned area of Krishna Bihar. This North-West facing plot offers excellent frontage and convenient access from two sides, making it an ideal choice for constructing a spacious and beautifully designed home.', 'plot', '', 'no', 'sale', '', '', '', 'resale', '', '3500 per sqft ', '2587 sqft ', '0', '', '', 'North and west facing ', '', '', '', '', '', '', '', '', '0', '0', '0', '0', '0', '1', '1', '1', '0', '0', '0', '0', '0', '1', '0', '0', '1', '1', '1', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '1', '1', '1', '1', '2026-09-28 06:33:36', NULL, 14, '0'),
(92, 'Kanchan vihar  ', NULL, 'Lamti ', 'jabalpur', 'A rare opportunity to own a 1850 sq. ft. premium corner plot in the well-positioned area of Krishna Bihar. This North-West facing plot offers excellent frontage and convenient access from two sides, making it an ideal choice for constructing a spacious and beautifully designed home.  The generous plot size provides ample flexibility for modern residential planning, including a premium independent house or duplex. Its corner positioning adds to the property\'s appeal by offering better accessibility, natural light, ventilation, and design possibilities.', 'plot', '', 'no', 'sale', '', '', '', 'resale', '', '4000 per sqft', '1850 sqft', '0', '', '', 'north and west facing ', '', '', '', '', '', '', '', '', '0', '0', '0', '0', '0', '1', '1', '1', '0', '0', '1', '0', '0', '1', '0', '1', '1', '1', '1', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '1', '1', '1', '1', '2026-09-28 07:14:17', NULL, 12, '0'),
(93, 'Gwarighat duplex ', NULL, 'Near ayurvedic collage Gwarighat road ', 'Jabalpur ', 'This spacious duplex property in Gwarighat, Jabalpur, offers a comfortable residential setting with a well-planned layout and a convenient location. It is a suitable option for families looking for a peaceful home as well as buyers considering a long-term property investment. If you are exploring Plots for Sale in Jabalpur, this area can also offer promising real estate opportunities. For those interested in Farm Land for Sale in Jabalpur, Siara Property can help you explore suitable options. Siara Property is a trusted real estate business assisting buyers and sellers with property opportunities across Jabalpur. Connect with us for professional guidance and suitable property options.', 'house', '', 'yes', 'sale', '', '0', '4', 'new', 'Duplex', '1.40 crore ', '1400 sqft ', '0', 'yes ', 'under cons', 'north facing ', 'Not Furnished', '2750 sqft ', '4', '1', '2', 'new ', 'yes', 'no', '0', '0', '0', '0', 'Non Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '0', '1', '1', '0', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '0', '0', '1', '1', '1', '1', '1', '2026-09-29 07:56:43', NULL, 12, '0'),
(94, 'Gwarighat duplex', NULL, 'Near ayurvedic collage Gwarighat road', 'Jabalpur', 'step into a home that feels spacious, comfortable, and truly your own. Reliable State Duplex Property at Gwarighat, Jabalpur, brings together thoughtful living spaces and the charm of a well-connected location. This duplex is an excellent choice for families who value privacy, space, and a comfortable lifestyle. With its distinctive duplex layout, it offers a practical setting for everyday living while also holding appeal as a long-term property investment. Siara Property helps buyers explore genuine real-estate opportunities with clear guidance and local expertise. From finding a suitable home to exploring Plots for Sale in Jabalpur or Farm Land for Sale in Jabalpur, your property search starts here.', 'house', '', 'yes', 'sale', '', '0', '3', 'new', 'Duplex', '70 lakhs ', '800 sqft', '0', 'yes', 'under cons', 'north south facing ', 'Not Furnished', '0', '3', '1', '0', 'new constr', 'yes ', 'no', '0', '0', '0', '0', 'Semi Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '0', '1', '1', '0', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '0', '0', '1', '1', '1', '1', '1', '2026-09-29 08:57:01', NULL, 15, '0'),
(95, 'Ayushi Dhara', NULL, 'lamheta ghat road sagra', 'jabalpuR', 'Discover your dream home at AYUSHI DHARA, located on Lamheta Ghat Road, Sagra, Jabalpur. This premium 4 BHK north-facing duplex offers spacious bedrooms, comfortable living areas, a modern kitchen, and thoughtfully designed interiors for everyday family living. Situated within a secure gated society, the property provides privacy, a peaceful environment, and a well-planned residential setting. Its attractive elevation and independent living spaces make it an excellent choice for families. Siara Property, a trusted property dealer in jabalpur, also assists buyers exploring Plots for Sale in Jabalpur and Farm Land for Sale in Jabalpur.', 'house', '', 'yes', 'sale', '', '0', '4', 'new', 'Duplex', '85 LAKHS ', '1100 sqft', '22/50', 'yes', 'new constr', 'north facing', 'Semi Furnished', '2100', '2', '1', '2', 'new', 'yes ', 'no', '1', '0', '0', '0', 'Full Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-11-10 08:03:35', NULL, 10, '0'),
(96, 'Ayushi Dhara  ', NULL, 'lamheta ghat road sagra  ', 'jabalpur ', 'AYUSHI DHARA – Premium 3.5 BHK Duplex in Jabalpur  Discover your ideal home at AYUSHI DHARA, located on Lamheta Ghat Road, Sagra, Jabalpur. This thoughtfully designed 3.5 BHK duplex features an 800 sq. ft. area, offering comfortable bedrooms, a functional living space, and a practical layout for modern family living. Situated within a gated society, the property provides privacy, security, and a peaceful residential atmosphere. Its attractive elevation and efficient space planning make it an excellent choice for families seeking comfortable independent living. Siara Property, a trusted property dealer in jabalpur, also helps buyers explore Plots for Sale in Jabalpur and Farm Land for Sale in Jabalpur.', 'house', '', 'yes', 'sale', '', '0', '3', 'new', 'Duplex', '65 lakhs ', '800 sqft ', '20/40 ', 'yes ', 'new constr', '        0', 'Semi Furnished', '1550 ', '2', '1', '2', 'new  ', 'yes', 'no ', '1', '1', '0', '0', 'Full Modular', '1', '1', '1', '0', '1', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-11-10 08:15:22', NULL, 7, '0'),
(97, 'Ayushi Dhara  ', NULL, 'lamheta ghat road sagra  ', 'jabalpur ', 'AYUSHI DHARA – Premium 4 BHK Triplex in Jabalpur Discover your dream home at AYUSHI DHARA located on Lamheta Ghat Road, Sagra, Jabalpur. This beautifully designed 4 BHK premium triplex offers spacious bedrooms, comfortable living areas, a modern kitchen, and thoughtfully planned interiors for luxurious family living. Featuring two separate entrance gates, the property provides added convenience, accessibility, and privacy. Situated within a gated society, this triplex offers a secure and peaceful residential environment. Its elegant elevation and spacious layout make it an excellent choice for families. Siara Property, a trusted property dealer in jabalpur, also offers Plots for Sale in Jabalpur and Farm Land for Sale in Jabalpur.', 'house', '', 'yes', 'sale', '', '0 ', '4', 'new', 'Triplex', '85 lakhs  ', '1000 sqft', '20/50', 'yes ', 'new constr', '0', 'Semi Furnished', '2350 sqft ', '3', '1', '2', 'new  ', '  yes', 'no ', '1', '1', '0', '0', 'Semi Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-11-10 08:25:28', NULL, 7, '0'),
(98, 'Ayushi Dhara', NULL, 'lamheta ghat road sagra', 'jabalpur ', 'AYUSHI DHARA – Premium 4 BHK Luxury Triplex in Jabalpur  Experience premium living at AYUSHI DHARA, located on Lamheta Ghat Road, Sagra, Jabalpur. This beautifully designed 4 BHK triplex features an elegant white exterior, stylish wooden entrance doors, decorative iron gates, and a spacious covered parking area. With two separate entrance gates, a tiled front courtyard, modern architectural detailing, and a well-designed staircase, this home offers comfort, privacy, and convenience. Situated in a gated society, it\'s ideal for modern family living. Siara Property, a trusted property dealer in jabalpur, also assists buyers exploring Plots for Sale in Jabalpur and Farm Land for Sale in Jabalpur.', 'house', '', 'yes', 'sale', '', '0', '4', 'new', 'Triplex', '95 lakhs ', '1200 sqft ', '0', 'yes', 'new constr', '0', 'Semi Furnished', '2630 sqft', '3 ', '1 ', '2 ', '   new', 'yes  ', 'no ', '1', '1', '0', '0', 'Full Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-11-10 08:30:49', NULL, 6, '0'),
(99, 'Ayushi awadh ', NULL, 'main road tripuri chowk in front of garha thana ', 'jabalpur ', 'Ayushi Awadh – Premium 4 BHK Triplex Villa in Dhanwantri Nagar, Jabalpur  Discover luxury living at Ayushi Awadh, featuring beautifully designed 4 BHK premium triplex villas in Dhanwantri Nagar, Jabalpur. These spacious villas offer modern architecture, elegant living areas, comfortable bedrooms, a stylish kitchen, and thoughtfully planned interiors. Located in a premium gated township, residents can enjoy a clubhouse, swimming pool, gym, landscaped gardens, children\'s play area, wide RCC roads, and CCTV security. Perfect for families seeking privacy, comfort, and an upscale lifestyle. Siara Property, your trusted property dealer in jabalpur, also provides Plots for Sale in Jabalpur and Farm Land for Sale in Jabalpur for smart property investments.', 'villa', '', 'yes', 'sale', '', '0', '4', 'new', 'Triplex', '1.25 cr', '1000 sqft  ', '0', 'yes ', 'under cons', '0', 'Semi Furnished', '2200', '4', '1', '3', 'new  ', 'yes ', 'no ', '1', '1', '0', '0', 'Full Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-11-10 10:07:11', NULL, 3, '0'),
(100, 'Ayushi awadh ', NULL, 'main road tripuri chowk in front of garha thana', 'jabalpur ', ' our Dream Villa, Your Signature Lifestyle  Discover Ayushi Awadh, an exclusive collection of premium 4 BHK triplex villas in Dhanwantri Nagar, Jabalpur. Designed for modern families, these stunning villas feature spacious bedrooms, elegant living spaces, contemporary architecture, and a perfect blend of luxury and privacy. Experience an upscale lifestyle with a swimming pool, clubhouse, gym, landscaped gardens, and secure gated surroundings. Whether you\'re searching for a dream home or a valuable real estate investment, Siara Property, a trusted property dealer in jabalpur, brings you exceptional opportunities, including Plots for Sale in Jabalpur and Farm Land for Sale in Jabalpur', 'villa', '', 'yes', 'sale', '', '0', '4', 'new', 'Triplex', '1.45 cr ', '1200 sqft  ', '0', 'yes ', 'under  con', '0', 'Semi Furnished', '2650', '4 ', '1', '2', 'new  ', ' yes ', 'no ', '1', '1', '0', '0', 'Full Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-11-10 10:12:39', NULL, 5, '0'),
(101, 'Ayushi awadh', NULL, 'main road tripuri chowk in front of garha thana', 'jabalpur ', 'Looking  for a spacious home where your family can live comfortably? Ayushi Awadh offers premium 4 BHK triplex villas in Dhanwantri Nagar, Jabalpur. With 2,750 sq. ft. of construction, these villas feature well-planned bedrooms, spacious living areas, and multiple floors for better privacy. The gated township includes wide RCC roads, a clubhouse, swimming pool, gym, garden, and children\'s play area. Siara Property, a reliable property dealer in jabalpur, helps you explore suitable homes and investment opportunities. We also assist buyers looking for Plots for Sale in Jabalpur and Farm Land for Sale in Jabalpur.', 'house', '', 'yes', 'sale', '', '0', '4', 'new', 'Triplex', '1.60 crore ', '1280 sqft ', '0', 'yes ', 'under cons', '0', 'Semi Furnished', '2750 sqft  ', '4', '1', '3', 'new ', ' yes ', 'no', '1', '1', '0', '1', 'Semi Modular', '1', '1', '1', '0', '1', '0', '0', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', '0', '0', '1', '0', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '2026-11-10 10:19:43', NULL, 4, '0');

-- --------------------------------------------------------

--
-- Table structure for table `properties_images`
--

CREATE TABLE `properties_images` (
  `id` int(11) NOT NULL,
  `property_id` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties_images`
--

INSERT INTO `properties_images` (`id`, `property_id`, `image`, `created_at`) VALUES
(58, '41', 'http://localhost:4000/uploads/1701417690617-2150799681.jpg', '2023-12-01 08:01:30'),
(59, '41', 'http://localhost:4000/uploads/1701417690700-2150799725.jpg', '2023-12-01 08:01:30'),
(61, '41', 'http://localhost:4000/uploads/1701417893260-tidy-hall-with-two-pictures-wall.jpg', '2023-12-01 08:04:53'),
(62, '41', 'http://localhost:4000/uploads/1701417893271-tidy-hall-with-white-couch.jpg', '2023-12-01 08:04:53'),
(63, '41', 'http://localhost:4000/uploads/1701417893279-3d-rendering-modern-dining-room-living-room-with-luxury-decor.jpg', '2023-12-01 08:04:53'),
(141, '43', 'http://localhost:4000/uploads/1703077640933-pexels-pixabay-280229.jpg', '2023-12-20 13:07:20'),
(142, '43', 'http://localhost:4000/uploads/1703077640953-pexels-vecislavas-popa-1643383.jpg', '2023-12-20 13:07:20'),
(144, '53', 'http://localhost:4000/uploads/1703077735673-pexels-terry-magallanes-2988860.jpg', '2023-12-20 13:08:56'),
(145, '53', 'http://localhost:4000/uploads/1703077735688-pexels-pixabay-209296.jpg', '2023-12-20 13:08:56'),
(147, '53', 'http://localhost:4000/uploads/1703077762626-pexels-curtis-adams-8031899.jpg', '2023-12-20 13:09:22'),
(148, '54', 'http://localhost:4000/uploads/1703077816211-pexels-terry-magallanes-2988860.jpg', '2023-12-20 13:10:16'),
(149, '54', 'http://localhost:4000/uploads/1703077816225-pexels-expect-best-323780.jpg', '2023-12-20 13:10:16'),
(150, '54', 'http://localhost:4000/uploads/1703077816232-pexels-mark-2724749.jpg', '2023-12-20 13:10:16'),
(151, '45', 'http://localhost:4000/uploads/1703077883564-pexels-rahul-pandit-2834211.jpg', '2023-12-20 13:11:24'),
(152, '45', 'http://localhost:4000/uploads/1703077883570-pexels-vecislavas-popa-1643383.jpg', '2023-12-20 13:11:24'),
(153, '45', 'http://localhost:4000/uploads/1703077883575-pexels-curtis-adams-8031899.jpg', '2023-12-20 13:11:24'),
(154, '45', 'http://localhost:4000/uploads/1703077883588-pexels-christa-grover-2121121.jpg', '2023-12-20 13:11:24'),
(170, '56', 'http://localhost:4000/uploads/1703774505424-WhatsApp Image 2023-12-28 at 7.43.21 PM.jpeg', '2023-12-28 14:41:45'),
(171, '56', 'http://localhost:4000/uploads/1703774591560-WhatsApp Image 2023-12-28 at 7.43.30 PM.jpeg', '2023-12-28 14:43:11'),
(174, '56', 'http://localhost:4000/uploads/1703774618305-WhatsApp Image 2023-12-28 at 7.43.28 PM.jpeg', '2023-12-28 14:43:38'),
(175, '56', 'http://localhost:4000/uploads/1703774618305-WhatsApp Image 2023-12-28 at 7.43.27 PM (1).jpeg', '2023-12-28 14:43:38'),
(176, '56', 'http://localhost:4000/uploads/1703774618307-WhatsApp Image 2023-12-28 at 7.43.27 PM.jpeg', '2023-12-28 14:43:38'),
(177, '56', 'http://localhost:4000/uploads/1703774618307-WhatsApp Image 2023-12-28 at 7.43.26 PM.jpeg', '2023-12-28 14:43:38'),
(178, '56', 'http://localhost:4000/uploads/1703774618309-WhatsApp Image 2023-12-28 at 7.43.25 PM.jpeg', '2023-12-28 14:43:38'),
(179, '56', 'http://localhost:4000/uploads/1703774618309-WhatsApp Image 2023-12-28 at 7.43.24 PM.jpeg', '2023-12-28 14:43:38'),
(180, '56', 'http://localhost:4000/uploads/1703774618309-WhatsApp Image 2023-12-28 at 7.43.23 PM (1).jpeg', '2023-12-28 14:43:38'),
(181, '56', 'http://localhost:4000/uploads/1703774618309-WhatsApp Image 2023-12-28 at 7.43.23 PM.jpeg', '2023-12-28 14:43:38'),
(182, '56', 'http://localhost:4000/uploads/1703774618312-WhatsApp Image 2023-12-28 at 7.43.22 PM (1).jpeg', '2023-12-28 14:43:38'),
(183, '56', 'http://localhost:4000/uploads/1703774618312-WhatsApp Image 2023-12-28 at 7.43.22 PM.jpeg', '2023-12-28 14:43:38'),
(268, '88', '1790412229517-bilhari duplex.jpeg', '2026-09-26 08:43:49'),
(270, '82', '1790413297409-shiv parisar commercial shop.jpeg', '2026-09-26 09:01:37'),
(271, '80', '1790413355298-Shiv parisar.jpeg', '2026-09-26 09:02:35'),
(273, '71', '1790413449123-vidit fortune.jpeg', '2026-09-26 09:04:09'),
(274, '70', '1790413493494-nakshtra nagar.jpeg', '2026-09-26 09:04:53'),
(275, '69', '1790413547649-nakshtra nagar.jpeg', '2026-09-26 09:05:47'),
(276, '81', '1790673655490-oswal plot.png', '2026-09-29 09:20:55'),
(277, '94', '1790676854476-gwarighat duplex.jpeg', '2026-09-29 10:14:14'),
(278, '93', '1790677062684-gwarighat duplex (2).jpeg', '2026-09-29 10:17:42'),
(279, '76', '1790677106485-goldern avenu duplex.jpeg', '2026-09-29 10:18:26'),
(280, '92', '1790942809320-lamti plot.jpeg', '2026-10-02 12:06:49'),
(284, '89', '1790942979512-gorakhpur flat.jpeg', '2026-10-02 12:09:39'),
(285, '86', '1790943222353-2BHK flat.png', '2026-10-02 12:13:42'),
(286, '75', '1790943790527-kachnar sambhar.png', '2026-10-02 12:23:10'),
(288, '90', '1790945435743-lamti plot.png', '2026-10-02 12:50:35'),
(289, '77', '1790945924027-rajul township duplex.png', '2026-10-02 12:58:44'),
(290, '84', '1790946144842-gwarighat bunglow.png', '2026-10-02 13:02:24'),
(291, '85', '1790946231993-ukhri plot.jpeg', '2026-10-02 13:03:51'),
(292, '78', '1790946265976-goldern avenu singlex.png', '2026-10-02 13:04:25'),
(293, '87', '1791117241420-1BHK.png', '2026-10-04 12:34:01'),
(294, '75', '1795253182378-kitchen kachnar sambhar.jpeg', '2026-11-21 09:26:22'),
(295, '75', '1795253197532-Sunlit Modern Bedroom Retreat.png', '2026-11-21 09:26:37'),
(296, '75', '1795253310142-dining area.jpeg', '2026-11-21 09:28:30'),
(300, '75', '1795254439180-living area.png', '2026-11-21 09:47:19'),
(301, '75', '1795254460261-2 bedroom.jpeg', '2026-11-21 09:47:40'),
(302, '75', '1795254469084-3 bedroom.jpeg', '2026-11-21 09:47:49'),
(303, '79', '1795435780208-goldern avenu plot.jpeg', '2026-11-23 12:09:40'),
(304, '96', '1795506402167-800 sqft ayushi dhara.png', '2026-11-24 07:46:42'),
(305, '98', '1795506721680-triplex ayuhi dhara.jpeg', '2026-11-24 07:52:01');

-- --------------------------------------------------------

--
-- Table structure for table `suggestions`
--

CREATE TABLE `suggestions` (
  `id` int(11) NOT NULL,
  `property_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suggestions`
--

INSERT INTO `suggestions` (`id`, `property_id`, `created_at`) VALUES
(23, '53', '2024-01-02 05:47:31'),
(25, '56', '2024-01-14 07:30:56'),
(26, '60', '2024-01-16 15:35:19'),
(27, '59', '2024-01-16 15:35:23');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `name`, `email`, `phone`, `password`, `created_at`) VALUES
(1, 'mohit', 'mohit@gmail.com', '9806324244', '$2b$10$kpNBAp3ZpTK/0NquAN1/g.UswxKFnCA85Rg..bGI4FfKxbNqZQFIm', '2023-12-27 11:48:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `contacted_user`
--
ALTER TABLE `contacted_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery_images`
--
ALTER TABLE `gallery_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_gallery_images_created_at` (`created_at`);

--
-- Indexes for table `intrestedusers`
--
ALTER TABLE `intrestedusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `popup_leads`
--
ALTER TABLE `popup_leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `properties_images`
--
ALTER TABLE `properties_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suggestions`
--
ALTER TABLE `suggestions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `contacted_user`
--
ALTER TABLE `contacted_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `gallery_images`
--
ALTER TABLE `gallery_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `intrestedusers`
--
ALTER TABLE `intrestedusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `popup_leads`
--
ALTER TABLE `popup_leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `properties_images`
--
ALTER TABLE `properties_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=306;

--
-- AUTO_INCREMENT for table `suggestions`
--
ALTER TABLE `suggestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
