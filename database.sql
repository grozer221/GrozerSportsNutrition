-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 17 2022 г., 11:02
-- Версия сервера: 8.0.24
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `grozer-sports-nutrition`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `isShown` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `isShown`, `createdAt`, `updatedAt`, `description`) VALUES
(6, 'BCAA ', 'bcaa', 1, '2022-01-13 13:25:52.023500', '2022-01-16 10:14:52.000000', '<p>These are complexes that consist of three essential amino acids with branched chains: leucine, isoleucine and valine. These bcaa amino acids are notable for the fact that they are not synthesized in the body and it can receive them only from the external environment &ndash; with food. In addition, these substances prevent catabolism (muscle destruction) during and after training and, in general, have a significant impact on the effectiveness of classes. It should be noted that the effectiveness of these substances has been proven by a large number of scientific studies and confirmed by the personal experience of thousands of athletes.</p>\n<p>Bcaa is recommended for use not only in powerlifting and bodybuilding, but also in all other sports. Also, these amines will be useful to people whose work is associated with physical exertion and poor nutrition, in addition, they will better help the body recover during outdoor activities.</p>\n<p>THE COMPOSITION OF BCAA SPORTS NUTRITION</p>\n<p>Most of these bcaa amino acids consist of leucine, isoleucine and valine in a ratio of 2:1:1, however, the formula 3:2:1 is also common. Other variants of the ratio are much less common. Leucine is a source of energy and at the same time, most of all helps to properly eat muscles during training. As a source of ATP, leucine shows better results even compared to glucose. Isoleucine provides rapid muscle recovery after training and is critical for hemoglobin synthesis. Also, isoleucine increases endurance. Valine provides nitrogen metabolism in the body, and also reduces the production of serotonin, the hormone responsible for feeling tired. In addition, valine is responsible for muscle coordination, which is also important in the training process. The price of bca amino acids is usually higher than for complex amino acids, but in our sports nutrition store amino acids and bcaa can be bought at affordable prices.</p>\n<p>THE MAIN EFFECTS OF THE RECEPTION.</p>\n<p>First of all, the main effect of taking bcaa sports nutrition is to reduce catabolism. This is due to the fact that during intense exercise, the level of essential amino acids in the body drops sharply, and its resumption occurs due to the release of these amino acids from muscle protein through its destruction. Therefore, the preliminary intake of this drug immediately before training, due to the high level of absorption of the substance, allows you to almost completely avoid this destructive process.</p>\n<p>Also, BCAAs increase the effectiveness of other sports supplements, such as protein and creatine by up to 40%. This is due to both a decrease in catabolism and an increase in muscle coordination. By reducing the feeling of fatigue when taking it, it becomes possible to train longer, which means getting more results from each workout.</p>\n<p>In addition, BCAAs are one of the direct cursors of more complex amino complexes responsible for the growth of muscle mass. Finally, the fat-burning function of bcaa is possible due to the stimulation of leptin gene expression. Leptin is a hormone responsible primarily for the regulation of fat in the body and under the influence of these substances, it stimulates their destruction to saturate the body with energy. Many are interested in where it is better to buy bca (bcaa) in Kiev and Ukraine, what is the price of bcaa (bcaa) amino acids? Visit our store and buy a sports drink of bcaa amino acids at the best price in Ukraine.</p>\n<p>THE ASSORTMENT OF OUR STORE.</p>\n<p>Our company offers to the attention of its customers all existing forms of bcaa amino acids at the best price in Ukraine, which are common in our sports nutrition market. Here you can buy both products from the world\'s largest manufacturers and from less well-known companies. We offer these products in various forms: capsules, powder and tablets, and here you can find the most convenient format for you.</p>\n<p>&nbsp;</p>\n<p>A good plus for our customers will be the availability of a convenient store where you can get acquainted with the most popular products, as well as immediately see detailed product descriptions, view photos and reviews from other customers. The cost of a sports pit is one of the most competitive on the market.</p>\n<p>It should be noted that we offer our customers only proven additives that have all the accompanying documents and certificates, which means that you will definitely not buy a low-quality product or a fake.</p>\n<p>BCAA - Questions and answers</p>\n<p>BCAA amino acids &ndash; for whom are they needed?</p>\n<p>BCAA is a building material for muscles. Therefore, the target audience of the product primarily includes representatives of power sports: bodybuilders, powerlifters, weightlifters.</p>\n<p>Due to the property of accelerating recovery after training and replenishing the energy balance, BCAA has become popular among runners, swimmers, crossfitters.</p>\n<p>&nbsp;</p>\n<p>When losing weight, amino acids are used to prevent the development of catabolic processes, as well as to stimulate the release of leptin, a hormone that suppresses appetite.</p>\n<p>BCAA - what are they made of?</p>\n<p>BCAA is a group of amino acids with branched side chains, which include leucine, isoleucine and valine. In the production of sports nutrition, leucine is usually taken twice or three times more than the other two substances.</p>\n<p>BCAAs are essential amino acids. They are not produced in the body, but enter the latter together with food (chicken fillet, beef, peanuts) or biologically active additives.</p>\n<p>BCAAs are necessary for athletes to grow lean muscle mass, because muscle consists of 35% of these amino acids.</p>\n<p>Are BCAAs suitable for weight loss?</p>\n<p>Yes. BCAAs do not have a fat-burning effect, but they retain muscles during weight loss, when the body seeks to destroy the gained muscle mass in order to generate energy. They also increase the consumption of calories, \"forcing\" the body to spend energy on the synthesis of new protein molecules.</p>\n<p>In addition, leucine stimulates the secretion of leptin. This hormone is responsible for regulating energy metabolism and suppressing appetite. It is produced by the body independently with an increase in body weight. But as soon as the weight drops a little, its release slows down. BCAA increases the formation of leptin even with a small amount of subcutaneous fat.</p>\n<p>WHY SHOULD YOU BUY AMINO ACIDS IN UKRAINE FROM US?</p>\n<p>First of all, because we are true professionals in our field and have a wealth of personal experience in the sports field. For us, this is not just a business, but a real hobby, which we will always be happy to talk about with our customers, and even more so to recommend something. The price of amino acids is one of the best on the market.</p>\n<p>Where are the best prices for bca sports? You can buy bcaa in our store in the center of Kiev, near the Leo Tolstoy metro station, you can also buy bcaa amino acids with delivery to Kharkiv, Dnepropetrovsk and throughout Ukraine, or order with delivery in the online store (Kiev and all Ukraine).</p>\n<p>Buy bcaa and other sports nutrition in our store in Kiev, we also deliver to Kharkov, Dnepropetrovsk, and the whole Ukraine.</p>'),
(7, 'Peanut butter', 'peanut-butter', 1, '2022-01-13 14:03:18.458558', '2022-01-13 14:48:44.000000', '<p>Peanut paste in sports</p>\n<p>For athletes, peanut paste is quite a tasty addition to their diet. Learn about its properties and application.</p>\n<p>Today, this type of sports nutrition is very popular in many countries of the world and especially the United States. Also, this product is able to replace meat for people who preach vegetarianism. This is a fairly old product that was invented at the end of the nineteenth century as an alternative food for vegetarians.</p>\n<p>After a little more than ten years, peanut paste began to be mass-produced and quickly won the hearts of Americans. This continues to this day. According to statistics, more than forty million people consume pasta every day in the United States alone.</p>\n<p>Fried peanuts, vegetable oil and maple syrup (sugar) are used to make the paste. This is the composition of the classic product, however, now many manufacturers add various additives to their products, for example, candied fruits, coconut chips, etc.</p>\n<p>The benefits of peanut paste</p>\n<p>This is not only a delicious, but a very useful product. It contains a large number of protein compounds, vitamins and minerals. For this reason, the caloric content of this product is quite high, which makes it valuable for athletes gaining weight. It is for this reason that peanut paste and sportpit turned out to be interconnected.</p>\n<p>The rich composition is one of the advantages of this product. Now we will tell you about others:</p>\n<p>Prevention of diseases of the heart and vascular system.</p>\n<p>Acceleration of testosterone secretion.</p>\n<p>Reduces the feeling of hunger.</p>\n<p>Prevents the development of diabetes mellitus.</p>\n<p>Enhances the work of the body\'s defense mechanisms.</p>\n<p>As mentioned above, the product contains a large amount of nutrients that normalize the work of all organs and systems of the body. This is an exclusively natural product. Of course, sometimes manufacturers add various artificial flavors or even fats. In our store, all items in this category contain only natural ingredients.</p>\n<p>Peanuts are a source of a large amount of vitamin E, which reduces the risk of diabetes mellitus and folic acid. This substance promotes the growth of cellular structures of tissues and their renewal. Relatively recently, one large-scale study was conducted that proved that the use of this product significantly reduces the risk of developing heart disease. Let\'s also recall the presence of a large amount of antioxidants. Buy peanut paste with delivery to Kiev, Odessa, all of Ukraine on bodymarket.ua .</p>\n<p>It is also important to note that now in the production of pasta, the ingredients are cold processed, which allows you to preserve all the nutrients. This wonderful product is used not only by athletes, but also by show business stars all over the world.</p>\n<p>It contains in large quantities not only protein compounds and vitamins, but also unsaturated fats, which are necessary for athletes. In addition, peanut paste perfectly eliminates the feeling of hunger, due to the presence of a large amount of fiber and protein compounds in the composition.</p>\n<p>The only obstacle to the use of this product may be an allergic reaction to legumes. Peanuts belong to this particular family of plants. Otherwise, it is an excellent product that diversifies the diet of athletes.</p>\n<p>Where is the best price and better to buy peanut butter sports nutrition? Pasta with delivery - Kiev, Odessa and all of Ukraine.</p>'),
(8, 'Creatine', 'creatine', 1, '2022-01-13 14:48:42.057874', '2022-01-13 14:48:42.057874', '<p>Despite the fact that creatine was isolated at the beginning of the 19th century, and talk about its use as a dietary supplement arose in the scientific community of the 20th century, it was first tested as a sports nutrition only in the 1990s. The experiments carried out showed its extremely high efficiency and subsequently it became one of the most popular types of dietary supplements for athletes. Now there are a large number of serious studies confirming the positive effect of creatine and its forms on the body and new ones are constantly being conducted, studying its interaction with other substances, as well as the possibilities for creating more advanced supplements.</p>\n<p>THE PHYSIOLOGICAL EFFECT OF CREATINE</p>\n<p>Creatine is one of the components of skeletal muscles and enters the body with the help of food. Also, its synthesis occurs in the body, so there is no reason to consider this element completely irreplaceable. However, during power loads, its level may decrease, which affects the effectiveness of classes. Taking creatine as an additive allows you to improve strength performance in a short time, as well as increase the hydration (filling with water) of muscle cells, which has a positive effect on the relief of muscles.</p>\n<p>Creatine is excreted mainly through the kidneys, while increasing the load on the excretory system, so a significant overdose of the supplement can lead to serious problems. However, if you take creatine in the quantities declared by the manufacturer, the number of side effects is extremely low, therefore, the safety of this type of sports nutrition can be considered consistently high. With a one-time intake of fast carbohydrates in conjunction with creatine, as well as other \"transport\" additives, its negative effect on the body is almost completely eliminated, and its effectiveness is significantly increased.</p>\n<p>FEATURES OF CREATINE INTAKE</p>\n<p>The main feature of taking creatine supplements for weight gain is the stage of the so-called \"loading\", when during the first five days of taking the substance is taken in an amount of 20 or more grams per day, and subsequently its norm is reduced to 2-5 grams per day. This allows you to significantly increase its level in the muscles in the first days, maintaining it afterwards.</p>\n<p>This system arose as a result of experiments that showed insignificant effectiveness of small doses on creatine secretion, and incredibly high &ndash; large ones. However, taking creatine for a long time, as it turned out, is not necessary &ndash; the initially elevated level of the substance in the body can be maintained for a long time only by taking small doses. Thus, large doses are necessary in order to bring its level to the maximum possible, which will subsequently be maintained by daily supplementation. It is also known that in about 10% of people, creatine intake does not cause any effect, which is due to the maximum production of this substance by the body and additionally confirms previous studies.</p>\n<p>&nbsp;</p>\n<p>WHERE TO BUY CREATINE IN UKRAINE?</p>\n<p>Various forms of creatine for muscle growth and related supplements can be easily found in the sports nutrition store. However, very often there is a need to purchase a specific sample, which can be very difficult to find on the shelves. In this case, you have to spend a lot of time searching for supplements in stores, as well as on the way to them. The online store that our company has allows you to get rid of this problem &ndash; you have the opportunity to immediately get acquainted with all our wide range of products, choose the right creatine for yourself, and each item in the catalog has a very detailed description, photos, as well as reviews from other customers about our company in general and this supplement in particular.</p>\n<p>In addition, we provide delivery not only when you decide to buy it in Kiev, but also in all major cities of Ukraine.</p>\n<p>Creatine - Questions and answers</p>\n<p>Creatine &ndash; what is it and its role in sports?</p>\n<p>Creatine is a substance that serves as a source of energy for muscles. Every day, the body wastes about 2 g of the compound with a total pool of 100 - 120 g . With intensive training, creatine consumption increases. Its stock should be replenished with special means that increase the number of ATP molecules, indirectly affecting the growth of muscle mass and improving the relief of muscles.</p>\n<p>Creatine supplements are most effective for a short-term increase in anaerobic endurance, therefore, they are widely used by athletes performing short-distance running, jumps, jerks, throws, weight lifting.</p>\n<p>In total, there are more than 20 types of creatine, but creatine monohydrate and anhydrous are recognized as the most effective. The first contains a water molecule, the second does not. They are produced in tablet, capsule and powder form.</p>\n<p>When a substance is combined with organic or inorganic acids, salts with certain advantages are obtained:</p>\n<p>nitrate - improves the delivery of nutrients to the muscles;</p>\n<p>citrate - available in effervescent tablets, easily dissolves;</p>\n<p>hydrochloride - does not have a negative effect on the digestive tract.</p>\n<p>Phosphocreatin for intravenous injections is also on the market.</p>\n<p>Why is Creatine monohydrate the most popular choice?</p>\n<p>Creatine monohydrate is a nitrogen-containing carboxylic acid with the addition of water. This form of creatine was the first to appear on the sports market, and since then no other advertised ergogenic agents have been able to displace it, since it is:</p>\n<p>well absorbed;</p>\n<p>it is not destroyed in the gastrointestinal tract, but reaches the muscles unchanged;</p>\n<p>more effectively than other substances, it enhances the growth of muscle mass, increases endurance and improves athletic performance;</p>\n<p>does not require a loading phase;</p>\n<p>it is inexpensive.</p>\n<p>The additive is available in the form of powder, tablets and capsules.</p>\n<p>ADVANTAGES OF BUYING IN OUR STORE</p>\n<p>I must say that all our employees of our company are not just sellers of sports nutrition &ndash; for them sports is a real hobby, so we are really well versed in various types of supplements and can always give good recommendations regarding a particular sample.</p>\n<p>Also, any buyer will surely be pleased with our pricing policy. Do not be afraid of such low prices &ndash; we can easily explain why we offer you this price. It is possible due to the fact that the presence of an online store saves us from the costs associated with maintaining a network of branches across the country &ndash; we do not spend our funds on renting and paying staff, while maintaining a wide audience coverage across the country. And due to the fact that all products are obtained directly from suppliers, there are no additional margins in its price due to resale costs and you can order your favorite creatine inexpensively. This guarantees the availability of creatine certification, as well as the complete absence of untested products, ineffective samples or fakes in the assortment. Where can I buy creatine in Ukraine - order sports nutrition on bodymarket.ua .</p>\n<p>Therefore, if you need delivery of sports nutrition to Kiev, Dnepropetrovsk, Krivoy Rog, or another city in Ukraine - contact us, we have the best price for the entire sports pit and creatine prices as well, you will receive the best service and will surely become our regular customer, regardless of which city you live in.</p>\n<p>You can buy creatine sports nutrition in Kiev, Dnepropetrovsk, Krivoy Rog, Kharkiv, Odessa (and all of Ukraine), at the best cost and price.</p>'),
(9, 'Complex fat burners', 'complex-fat-burners', 1, '2022-01-16 10:51:42.011779', '2022-01-16 10:51:42.011779', '<p>Complex thermogenic and lipotropic fat burners</p>\n<p>Complex fat burners and the topic of fat burning has been troubling the minds of men and women for many years. More than one article and book on this topic has been written, there are many stereotypes and myths in this subject. Of course, we will not unscrew everything, but some recommendations can be given. Firstly, no matter what anyone says, but the process of losing weight is always creating a calorie deficit, i.e. we must consume fewer calories than we spend, then we will lose weight, because the laws of physics are inexorable and we will not be able to change them. But here there are many features and pitfalls, because of which many people have not been able to lose weight, and many diets have not brought the desired effect.</p>\n<p>Weight loss rules</p>\n<p>During weight loss, it is important that we lose fat mass, and not muscles, bones, organ tissue, etc. Of course, during weight loss, the body loses weight completely evenly, it is impossible to lose weight in certain places, local fat reduction is a myth, but if you follow the following rules, you can achieve results with minimal losses of both the tissues we need and nerves and with maximum result:</p>\n<p>firstly, any weight loss requires moral and volitional efforts, and this requires motivation &ndash; you must clearly understand why you are doing this;</p>\n<p>there must necessarily be a negative balance in the energy value of the diet, but it must be no less than 500-800 calories than your daily normal diet, otherwise, your body will weaken too much, slow down all metabolic processes and the process of losing weight may stop;</p>\n<p>complex fat burners, carrying such essential substances for fat burning as stimulants, biotin, tyrosine and l carnitine, help a lot in the process of weight loss;</p>\n<p>you should consume at least 30 ml of water per kg of body weight per day;</p>\n<p>it is worth dividing all meals by 5-7 times (taking into account snacks) and carefully monitor the amount of food taken and its energy value (this is a critically important factor, without which your weight loss will not be effective);</p>\n<p>it is also worth leaving a normal balance of nutritional value of food so that you receive proteins, fats and carbohydrates in the same proportions (sometimes the percentage of carbohydrates can be reduced in favor of proteins), and it is also worth taking vitamins, minerals, amino acids and other important nutrients in addition.</p>\n<p>Here you can buy sports nutrition Complex fat burners with fast delivery to Kiev, Kharkiv, Donetsk, Dnepropetrovsk, Lviv, Odessa, Nikolaev, Kherson, Zaporozhye, Ivano-Frankivsk, Chernivtsi, Ternopil, Khmelnitsky, Vinnytsia, Chernihiv, Zhytomyr, Cherkasy, Kirovograd, Poltava, Sumy and other cities of Ukraine</p>'),
(10, 'OMEGA 3', 'omega-3', 1, '2022-01-16 11:06:10.350834', '2022-01-16 11:06:10.350834', '<p>It is a very important fatty acid for athletes. They have a lot of useful properties.</p>\n<p>These are unsaturated omega 3 fats that cannot be synthesized in the body. If there is a deficiency of these substances in the body, there may be disturbances in the work of systems and organs.</p>\n<p>Omega 3s were discovered quite a long time ago, but scientists were able to fully verify their value relatively recently. Scientists already in the seventies knew that these substances have a positive effect on the work of the heart and vascular system. This became clear after the study of the peoples of the northern regions of the planet, who consumed seafood in large quantities.</p>\n<p>Omega 3 Effects</p>\n<p>Omega 3 fats have a wide range of beneficial properties, but we will focus only on those that are important to athletes:</p>\n<p>Metabolism increases.</p>\n<p>The weight gain and fat burning process are accelerated.</p>\n<p>The insulin sensitivity of tissues increases.</p>\n<p>Blood viscosity decreases, and its other rheological properties improve.</p>\n<p>Endurance increases and overall tone increases.</p>\n<p>They are precursors of anti-inflammatory elements of the blood.</p>\n<p>Increases the efficiency of the brain.</p>\n<p>The quality of the skin improves.</p>\n<p>An excellent source of energy that guarantees no increase in body fat.</p>\n<p>The secretion of anabolic hormones, including testosterone, is accelerated.</p>\n<p>The rate of cortisol production decreases.</p>\n<p>Omega three fatty acids (omega 3) benefit not only athletes, but these \"vitamins\" should be bought by all people leading an active lifestyle, you will find the best price in Ukraine at the bodymarket.</p>\n<p>The importance of the omega 3 and 6 ratio</p>\n<p>Not so long ago, studies were conducted that proved the great importance of omega-3. These substances are irreplaceable and can be obtained only with the help of sports supplements or food. During the experiment, it was found that omega-6 and 3 are competitors for the right to use the same enzymes in biochemical reactions.</p>\n<p>&nbsp;</p>\n<p>This fact suggests that the ratio of these fats has a great impact on the production of their metabolites and, as a result, on the body as a whole. The results of these experiments were taken into account by the manufacturers of sports nutrition and all modern products have the necessary ratio of these fatty acids.</p>\n<p>Using Omega 3 in sports</p>\n<p>The mere fact of accelerating the production of anabolic hormones makes the use of supplements containing omega-fats mandatory. However, as mentioned above, these substances have a very wide range of effects on the body. One of these is to increase the efficiency of the brain.</p>\n<p>Most athletes understand the importance of neuromuscular connections. In many ways, they depend on the work of the brain, and omega-fats, in turn, can increase this indicator. The human brain consists of sixty percent of fats, and the main role is played by omega-fatty acids.</p>\n<p>If there is a deficiency of these substances, then the body begins to use other types of fats, which significantly reduces the efficiency of the brain. This fact cannot but affect the effectiveness of the training. First of all, this is due to a decrease in the rate of information transfer within cellular structures and, as a result, neuromuscular connections deteriorate.</p>\n<p>Given the rate of use of omega-fats by the body during training, it is almost impossible for athletes to replenish their supply with the help of food alone. In this regard, there is a need for the use of sports supplements. In addition, many seafood products, which are the main source of omega-fatty acids, have the ability to accumulate carcinogens. In the light of the current environmental situation, this is a very bleak fact. In the production of additives, only pure natural sources of these essential substances for humans are used.</p>\n<p>It is also necessary to remember about the ability of fatty acids to oxidize within a fairly short time during storage and to break down under the influence of high temperatures. All manufacturers of the additive use modern technologies that allow to preserve omega-fatty acids in the final product in full composition.</p>\n<p>It should also be noted that there are other types of fats in food that are not useful for the body. Sports supplements do not contain foreign substances in their composition, but only omega-fatty acids.</p>\n<p>Omega 3 - Questions and answers</p>\n<p>What is omega-3?</p>\n<p>Omega-3s are unsaturated fatty acids that play an important biological role in the body, but are not synthesized by the latter in sufficient quantities. Therefore, both athletes and ordinary people need to take special supplements, which include the brightest representatives of PUFA - EPA, DHA and ALA. They:</p>\n<p>accelerate the metabolism;</p>\n<p>regulate calcium metabolism, strengthening bones;</p>\n<p>improve joint mobility;</p>\n<p>simplify the process of memorizing information;</p>\n<p>dissolve cholesterol plaques;</p>\n<p>increase the body\'s defenses</p>\n<p>In addition, omega-3s slow down the growth of tumors and protect collagen from destruction, making the skin elastic.</p>\n<p>Are there any contraindications for omega-3?</p>\n<p>There are no direct contraindications, but omega-3 is not recommended for people suffering from:</p>\n<p>allergies to seafood;</p>\n<p>individual intolerance to fish oil;</p>\n<p>active form of pulmonary tuberculosis;</p>\n<p>thyroid disorders;</p>\n<p>pancreatitis;</p>\n<p>stomach and duodenal ulcers;</p>\n<p>cholelithiasis or urolithiasis, when calcium salts are deposited in the gallbladder or kidneys, the amount of which PUFA will increase;</p>\n<p>heavy menstruation, hemorrhoids or hemophilia, because fish oil dilutes the blood.</p>\n<p>To avoid hypervitaminosis, you should not take omega-3 with vitamins A and D.</p>\n<p>How to take omega-3?</p>\n<p>The dosage of fish oil depends on the goal pursued by the athlete. If he plans to simply strengthen his health, 1000 - 1500 mg of PUFA per day is enough. If a bodybuilder seeks to build muscle mass, the dose should be increased to 2-3 g. When losing weight, it is necessary to drink 3000 &ndash; 4000 g of fish oil daily. It is not recommended to take more than 7 &ndash; 8 g at a time.</p>\n<p>The time of reception does not matter. Capsules are usually consumed with food. The daily dose can be divided into two doses.</p>\n<p>Where to buy omega three (omega 3) in Kiev?</p>\n<p>How much do omega 3 medications usually cost? Prices for omega 3 vary on average between $ 7-12. You can buy omega 3 fish oil (omega 3) at the best price in Kiev at bodymarket.ua . When creating their products, manufacturing companies use a competent ratio of two types of fats, and also take care of their safety. It is not possible to achieve this thanks to only one food. If you are seriously engaged in sports, then supplements containing omega-fatty acids should become mandatory for you to use. This is the only way you can achieve high results.</p>\n<p>You can buy sports nutrition omega 3 fatty acids with delivery to Kiev, Kharkiv, Zaporozhye, Odessa (and all of Ukraine) - on bodymarket.ua the best price.</p>'),
(11, 'new category', 'new-category', 0, '2022-01-16 19:50:15.437761', '2022-01-16 19:56:35.000000', '<p>1</p>'),
(12, 'category', 'category', 0, '2022-01-16 19:55:05.239967', '2022-01-17 08:01:54.000000', '<p>category category</p>');

-- --------------------------------------------------------

--
-- Структура таблицы `files`
--

CREATE TABLE `files` (
  `id` int NOT NULL,
  `originalName` varchar(255) NOT NULL,
  `mimetype` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `size` int NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `fileName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `files`
--

INSERT INTO `files` (`id`, `originalName`, `mimetype`, `destination`, `size`, `createdAt`, `updatedAt`, `fileName`) VALUES
(50, 'BCAA XPLODE.jpg', 'image/jpeg', './static/files', 16986, '2022-01-13 13:27:00.851809', '2022-01-13 13:27:00.851809', '06b36ff3e17b8795d55e57af5059e234_BCAA XPLODE.jpg'),
(51, 'AMINO_X.jpg', 'image/jpeg', './static/files', 7714, '2022-01-13 14:29:06.460892', '2022-01-13 14:29:06.460892', '6d7bf186567d6818d7e8a168835bb74c_AMINO_X.jpg'),
(52, 'BCAA5000.jpg', 'image/jpeg', './static/files', 41860, '2022-01-13 14:38:15.334783', '2022-01-13 14:38:15.334783', 'e10f8d7f5dc2d7101891751c4f14be7e61_BCAA5000.jpg'),
(53, 'ARAXISOVAYA-PASTE-IZYUM-KORISA.jpg', 'image/jpeg', './static/files', 9243, '2022-01-13 14:41:19.974568', '2022-01-13 14:41:19.974568', '95584658b7831c2e8d39abefc8522e91_ARAXISOVAYA-PASTE-IZYUM-KORISA.jpg'),
(54, 'NOTVIT-SILLIK-BULGANLARDACHI.jpg', 'image/jpeg', './static/files', 38387, '2022-01-13 14:46:20.686789', '2022-01-13 14:46:20.686789', '7be9f46b4f2818da8f0c90eafd1f8a05_NOTVIT-SILLIK-BULGANLARDACHI.jpg'),
(57, 'CREATINE-PH-X.jpg', 'image/jpeg', './static/files', 14228, '2022-01-13 14:51:36.433668', '2022-01-13 14:51:36.433668', '410bb6d2e97a36a9ae12010cb1ff546342_CREATINE-PH-X.jpg'),
(58, 'PURE-CREATINE.jpg', 'image/jpeg', './static/files', 16801, '2022-01-13 14:53:55.144379', '2022-01-13 14:53:55.144379', 'f10c1caf6e1010a794b27b8d323437710104_PURE-CREATINE.jpg'),
(59, 'KREA7-SUPERALKALINE.jpg', 'image/jpeg', './static/files', 18208, '2022-01-13 14:56:40.380780', '2022-01-13 14:56:40.380780', 'b287bade3a5ff82af3eeb2c846de6af6_KREA7-SUPERALKALINE.jpg'),
(60, 'BCAA 8-1-1.jpg', 'image/jpeg', './static/files', 10389, '2022-01-16 10:47:16.018955', '2022-01-16 10:47:16.018955', '5ac0c8ccd97152979eff6cf49bc154f7_BCAA 8-1-1.jpg'),
(61, 'THERMO-DRINE-COMPLEX.jpg', 'image/jpeg', './static/files', 14878, '2022-01-16 10:52:46.021086', '2022-01-16 10:52:46.021086', 'df07fc102d24454ce6a7511056eeb2139a_THERMO-DRINE-COMPLEX.jpg'),
(62, 'BLACK-SPIDER.jpg', 'image/jpeg', './static/files', 12063, '2022-01-16 10:55:00.287126', '2022-01-16 10:55:00.287126', 'b462bb9d13a9dc9103a9b22b4a90f47ac_BLACK-SPIDER.jpg'),
(63, 'METHYLDRENE-25.jpg', 'image/jpeg', './static/files', 15028, '2022-01-16 10:57:18.101233', '2022-01-16 10:57:18.101233', '4795c8486b353273690987f45adc8a12_METHYLDRENE-25.jpg'),
(64, 'OMEGA-3.jpg', 'image/jpeg', './static/files', 8700, '2022-01-16 11:06:54.667445', '2022-01-16 11:06:54.667445', 'f62db5e110294c46131010f8dcadf49497d_OMEGA-3.jpg'),
(65, 'XTEND.jpg', 'image/jpeg', './static/files', 9871, '2022-01-16 16:19:28.509461', '2022-01-16 16:19:28.509461', 'c6332fcb60ac3ebaddae5da4572a628c_XTEND.jpg'),
(67, 'BCAA-PLUS.jpg', 'image/jpeg', './static/files', 11733, '2022-01-16 19:29:38.768308', '2022-01-16 19:29:38.768308', '4ba3f8837a565d54fd3ae97aea9a89106_BCAA-PLUS.jpg'),
(69, 'CREATINE-MONOHYDRATE-OLIMP.jpg', 'image/jpeg', './static/files', 73564, '2022-01-17 08:00:01.653916', '2022-01-17 08:00:01.653916', '599ac210ce5931ea6f66104583410603a1_CREATINE-MONOHYDRATE-OLIMP.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `shippingMethod` enum('warehouse','courier') NOT NULL DEFAULT 'warehouse',
  `orderStatus` enum('new','picking','delivering','waitingForTheCustomerAtThePickUpPoint','completed','canceled') NOT NULL DEFAULT 'new',
  `deliveryCityCode` varchar(255) DEFAULT NULL,
  `deliveryCityName` varchar(255) DEFAULT NULL,
  `deliveryWarehouse` varchar(255) DEFAULT NULL,
  `totalPrice` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `createdAt`, `updatedAt`, `userId`, `email`, `firstName`, `lastName`, `phoneNumber`, `address`, `shippingMethod`, `orderStatus`, `deliveryCityCode`, `deliveryCityName`, `deliveryWarehouse`, `totalPrice`) VALUES
(42, '2022-01-13 15:14:10.406115', '2022-01-16 10:00:46.000000', 12, 'smjthebest@gmail.com', 'Vitaliy', 'Vaskivskiy', '+380675283471', 'смт. Ємільчине, Ємільчинський р-н, Житомирська обл. Відділення №1: вул. Незалежності, 19а', 'warehouse', 'completed', '69da41d8-3f5d-11de-b509-001d92f78698', 'смт. Ємільчине, Ємільчинський р-н, Житомирська обл.', 'Відділення №1: вул. Незалежності, 19а', 699),
(43, '2022-01-13 15:15:48.870621', '2022-01-16 10:00:43.000000', 12, 'smjthebest@gmail.com', 'Denis', 'Ivanov', '+380675283471', 'м. Київ, Київська обл. Відділення №2: вул. Бережанська, 9 (Оболонь Лугова)', 'warehouse', 'canceled', '8d5a980d-391c-11dd-90d9-001a92567626', 'м. Київ, Київська обл.', 'Відділення №2: вул. Бережанська, 9 (Оболонь Лугова)', 2513),
(44, '2022-01-15 18:54:20.713801', '2022-01-16 10:00:39.000000', 12, 'smjthebest@gmail.com', 'Vitaliy', 'Movchan', '+380999999999', 'м. Київ, Київська обл. Відділення №7 (до 5 кг): вул. Гната Хоткевича, 8 (м.Чернігівська)', 'warehouse', 'new', '8d5a980d-391c-11dd-90d9-001a92567626', 'м. Київ, Київська обл.', 'Відділення №7 (до 5 кг): вул. Гната Хоткевича, 8 (м.Чернігівська)', 1516),
(45, '2022-01-15 18:56:04.875736', '2022-01-16 10:00:35.000000', 12, 'smjthebest@gmail.com', 'Vadim', 'Podlutskiy', '+380615485478', 'м. Житомир, Житомирська обл. Відділення №16 (до 30 кг): вул. Рихліка Євгена, 11А', 'warehouse', 'canceled', 'db5c88c4-391c-11dd-90d9-001a92567626', 'м. Житомир, Житомирська обл.', 'Відділення №16 (до 30 кг): вул. Рихліка Євгена, 11А', 1316),
(46, '2022-01-16 10:06:03.636218', '2022-01-16 10:12:38.000000', 12, 'smjthebest@gmail.com', 'Egor', 'Ovseukov', '+380685495678', 'м. Житомир, Житомирська обл. Відділення №17 (до 30 кг): вул. Київська, 77 (ТРЦ \"Глобал UA\")', 'warehouse', 'picking', 'db5c88c4-391c-11dd-90d9-001a92567626', 'м. Житомир, Житомирська обл.', 'Відділення №17 (до 30 кг): вул. Київська, 77 (ТРЦ \"Глобал UA\")', 936),
(47, '2022-01-16 11:21:40.583476', '2022-01-16 11:21:40.000000', 12, 'smjthebest@gmail.com', 'Vitaliy', 'Vaskivskiy', '+380685495678', 'смт. Ємільчине, Ємільчинський р-н, Житомирська обл. Відділення №1: вул. Незалежності, 19а', 'warehouse', 'new', '69da41d8-3f5d-11de-b509-001d92f78698', 'смт. Ємільчине, Ємільчинський р-н, Житомирська обл.', 'Відділення №1: вул. Незалежності, 19а', 824),
(48, '2022-01-16 11:22:54.871962', '2022-01-16 18:27:19.022593', 12, 'admin@admin.com', 'Roman', 'Kormush', '+380625485671', 'м. Житомир, Житомирська обл. Поштомат \"Нова Пошта\" №6125: вул. Михайла Грушевського, 50/81 (маг. Малина)', 'warehouse', 'new', 'db5c88c4-391c-11dd-90d9-001a92567626', 'м. Житомир, Житомирська обл.', 'Поштомат \"Нова Пошта\" №6125: вул. Михайла Грушевського, 50/81 (маг. Малина)', 824),
(49, '2022-01-16 18:31:02.585672', '2022-01-16 18:31:02.000000', 12, 'user@user.com', 'User', 'User', '+380615485478', 'м. Київ, Київська обл. Відділення №31 (до 30 кг): вул. Московська, 5/2а, (м. \"Арсенальна\")', 'warehouse', 'new', '8d5a980d-391c-11dd-90d9-001a92567626', 'м. Київ, Київська обл.', 'Відділення №31 (до 30 кг): вул. Московська, 5/2а, (м. \"Арсенальна\")', 2542),
(51, '2022-01-17 07:43:30.521566', '2022-01-17 07:43:30.000000', 12, 'smjthebest@gmail.com', 'Vitaliy', 'Vaskivskiy', '+380615485478', 'м. Житомир, Житомирська обл. Відділення №6 (до 30 кг): вул. Небесної Сотні, 52', 'warehouse', 'new', 'db5c88c4-391c-11dd-90d9-001a92567626', 'м. Житомир, Житомирська обл.', 'Відділення №6 (до 30 кг): вул. Небесної Сотні, 52', 1505);

-- --------------------------------------------------------

--
-- Структура таблицы `pages`
--

CREATE TABLE `pages` (
  `id` int NOT NULL,
  `isShown` tinyint NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `sorting` int NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `pages`
--

INSERT INTO `pages` (`id`, `isShown`, `name`, `slug`, `sorting`, `createdAt`, `updatedAt`, `text`) VALUES
(9, 1, 'Delivery and payment', 'delivery-and-payment', 2, '2022-01-13 14:59:32.251587', '2022-01-17 07:47:40.000000', '<h1>Delivery and payment</h1>\n<p>Dear customers, we are pleased to offer you the following product delivery options:</p>\n<p>1) In Kiev:</p>\n<p>Delivery to your address:</p>\n<p>a) if the order is less than 2500 UAH, the cost of delivery is 50 UAH,</p>\n<p>b) if the order is 2500 UAH. and more, the delivery is free.</p>\n<p>Pickup:</p>\n<p>You can pick up your order from the office, after checking whether the goods are in stock.</p>\n<p>New Mail (cash on delivery or prepaid)</p>\n<p>We are located at: 4a Rognedinskaya Street, floor 4 (2-3 minutes walk from Leo Tolstoy metro station or Sports Palace)</p>\n<p>2) In Ukraine (sending via Nova Poshta service):</p>\n<p>By 100% prepayment of the order:</p>\n<p>Delivery is paid at the rates of \"New Poshti\"</p>\n<p>Attention! Make the payment only after the order is confirmed by the manager.</p>\n<p>After payment, we will send you the order within the agreed time frame, there is no need to notify us about the payment, if we cannot identify your payment, we will call you back.</p>\n<p>Payment upon receipt (cash on delivery):</p>\n<p>When paying on the spot, an additional 2% of the order value is paid for the cash on delivery service.</p>\n<p>If you wish to pay for the order in advance, you can do this by transferring money to the account. Payment details will be provided to you by the manager when placing an order.</p>\n<p>Please check the availability and integrity of the packaging upon receipt of the goods! We do not accept opened or damaged goods back!</p>\n<p>For all questions related to delivery, please contact us by phone!</p>\n<p>(099) 26-90-333; (096) 0-3333-69; (093) 06-38-333</p>\n<p>&nbsp;</p>'),
(10, 1, 'Refund and Exchange', 'refund-and-exchange', 1, '2022-01-13 15:00:41.809202', '2022-01-17 07:47:40.000000', '<h1>Refund and Exchange</h1>\n<p>Dear customers, the store bodymarket.ua I am always glad to see you and provide you with high-quality and certified products.</p>\n<p>We work only with official suppliers of sports supplements in Ukraine and have sanitary and epidemiological conclusions of the Ministry of Health of Ukraine confirming the proper quality of the products we sell, you can see them in the Certificates section.</p>\n<p>Guided by the Law of Ukraine &ldquo;On Consumer Rights Protection\", sports nutrition belongs to the category of food products - food products. According to the Resolution of the Cabinet of Ministers of Ukraine dated 03/19/1994 No. 172, high-quality food products are not subject to exchange and return.</p>\n<p>At the same time, we always go to meet our clients and are ready to sort out any situation. So, guided by Article 9 (Part one) of the Law of Ukraine \"On Consumer Rights Protection\" regarding the return of non-food products of good quality, you have the right to return or exchange within 14 days (from the next day of purchase) the purchased products of good quality in our store in the event that the product has not been unpacked and used, and also has a marketable appearance (not damaged).</p>\n<p>If you have opened and used the product, but want to return it due to doubts about the improper quality, you must do the following:</p>\n<p>According to Article 8 (part 14) of the Law of Ukraine \"On Consumer Rights Protection\", in case of doubts about the quality of the consumed goods, such goods must be subjected to a specialized examination.</p>\n<p>You need to submit the product for laboratory examination and get the analysis results that prove the composition of the product, as well as its quality.</p>\n<p>In this case, we will have strong evidence of poor-quality products and will be able to make you an exchange or refund.</p>\n<p>The methods of conducting a \"home examination\" are not accepted as genuine results of the analysis and are also not considered as fundamental for the exchange or return of products.</p>\n<p>Some details about the \"home checks\" can be found here: Frequently Asked Questions.</p>\n<p>At the same time, we want to assure you that repeated laboratory tests of our products have proved its authenticity, which is confirmed by the constantly growing number of satisfied customers.</p>\n<p>We hope that by purchasing products in our store, you will not encounter any problems and will always be glad to have your purchase.</p>'),
(11, 1, 'Contacts', 'contacts', 3, '2022-01-13 15:01:59.970857', '2022-01-17 07:41:52.000000', '<h1>Contacts</h1>\n<p>Our phones:</p>\n<p>(096) 0-3333-69</p>\n<p>(093) 06-38-333</p>\n<p>(099) 26-90-333</p>\n<p>Working Hours: Mon-Fri: 9:00 - 19:00</p>\n<p>Sat: 10:00 - 18:00</p>\n<p>Sun: 10:00 - 17:00</p>\n<p>We are located at the address:</p>\n<p>Kiev city, Rognedinskaya street 4, floor 4 (2-3 minutes walk from Leo Tolstoy metro station or Sports Palace)</p>\n<p>When we created our online store bodymarket.ua our main goal was to provide maximum service and high quality services in the sports nutrition market, which we had not seen before. We understood that the market is in urgent need of a resource that will allow you to receive sports nutrition from all popular brands at very good prices, will be convenient and understandable to everyone and will become a reliable and good friend to both novice athletes and professional athletes for years. We have always loved sports, many of us are engaged in powerlifting, bodybuilding and other sports, we know the needs of athletes and have always felt that we can satisfy them like no other.</p>\n<p>The philosophy of our store not only extends to the sale of sports nutrition and related products, we strive to create a full-fledged human development center. On our website you will find the most useful information on nutrition, training, rest regime. We will popularize sports with all the methods available to us and will never stop in these endeavors. We have always treated people with kindness, we want people to concentrate their efforts on achieving noble and wonderful goals at all times, and sport is a fantastic way to refine their spirit, strength and character.</p>\n<p>We believe in everyone\'s success, rejoice in victories and do not despair of defeats, we will always be with you and we are infinitely glad to see you on our website!</p>');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `isShown` tinyint NOT NULL DEFAULT '1',
  `userId` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `characteristics` json NOT NULL,
  `priceUAH` int NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `createdAt`, `updatedAt`, `isShown`, `userId`, `quantity`, `characteristics`, `priceUAH`, `slug`, `description`) VALUES
(8, 'BCAA XPLODE', '2022-01-13 13:43:04.494253', '2022-01-17 07:43:30.000000', 1, NULL, 97, '[{\"name\": \"Glutamine \", \"value\": \"1 g\"}, {\"name\": \"Valine\", \"value\": \"1.5 g\"}, {\"name\": \"Isoleucine\", \"value\": \"1.5 g\"}]', 598, 'bcaa-xplode', '<p>Any athlete knows how important it is to take amino acids during training and during rest periods, which increase the efficiency of protein absorption and monitor the energy balance in the body. Many of these components are found in food products &ndash; in dairy complexes, in fish, vegetables, cereals.</p>\n<p>BENEFITS OF BCAA EXPLOIT FROM OLYMPUS LABS</p>\n<p>But only olimp bcaa xplode has amino acids with a branched side chain, which are important not only for the growth of muscle tissue, but also to accelerate the metabolic process, slow down the destruction of cells during rest, and maintain the tone of the whole body. If you add vitamins and glutamine to these components, you will get a useful and effective Olimp Labs BCAA Xplode complex, which will help every athlete to build muscle tissue and provide the whole body with the necessary energy reserves. Bcaa Ixplod Olympus is recognized as one of the best among European analogues and is in the TOP sales in the sports nutrition markets.</p>\n<p>BCAA XPLODE: COMPOSITION AND FUNCTIONS</p>\n<p>BCAA Xplode from the manufacturer Olimp Labs is a complex of pure amino acids or so-called \"anabolic bricks\" that will ensure the growth of muscle fibers. This nutrition enters the circulatory system directly, bypassing the liver and immediately begins to benefit the muscles. And already there, the amino acids represented in the complex by leucine, isoleucine and valine activate anabolic processes, increase the efficiency of protein synthesis and regenerate cells after training. Taking bcaa Ixpload also slows down catabolism, that is, the destruction of muscle tissue. The complex will replenish energy reserves, and even during intensive training, the athlete will feel great.</p>\n<p>INGREDIENTS BCAA IXPLOAD OLYMPUS</p>\n<p>To ensure that Bcaa Ixplod possessed all of the above characteristics, the manufacturer was able to thanks to a competently balanced composition. 10 grams of BCAA Xplode contains:</p>\n<p>3 grams of leucine, which suppresses the breakdown of protein components - protein molecules, ensures the growth of muscle mass;</p>\n<p>1.5 grams of isoleucine, normalizing the energy balance and regulating the processes of hemoglobin synthesis and blood sugar levels;</p>\n<p>1.5 grams of valine, which restores muscle tissue;</p>\n<p>1 gram of glutamine, which ensures the maintenance of nitrogen balance in cells, which guarantees complete and effective assimilation of amino acids;</p>\n<p>0.002 grams of vitamin B6, which is responsible for protein metabolism and the smooth functioning of the nervous and hematopoietic systems.</p>\n<p>The unusual combination of components in Olimp Labs BCAA Xplode make the complex an indispensable assistant for amateurs and professional athletes, and anyone who wants to adjust their figure. It is also worth noting that, unlike many similar sports products, this complex of pure amino acids has pronounced taste characteristics. Athletes who can\'t stand the lack of taste can choose BCAA Xplode with orange, pineapple, lemon, strawberry and other additives. Now you can consume useful amino acids with pleasure!</p>\n<p>Here you can buy sports nutrition BCAA Olimp Labs BCAA Xplode with fast delivery to Kiev, Kharkiv, Donetsk, Dnepropetrovsk (all Ukraine), we have the best price.</p>'),
(9, 'AMINO X', '2022-01-13 14:28:18.680297', '2022-01-14 16:16:40.000000', 1, NULL, 22, '[{\"name\": \"Serving size:\", \"value\": \"1 measuring spoon (14.5 g)\"}, {\"name\": \"Vitamin D\", \"value\": \"500IU\"}, {\"name\": \"Sodium \", \"value\": \"160 mg\"}]', 699, 'amino-x', '<p>WHAT IS UNIQUE ABOUT THE AMINO X DIETARY AMINO ACID SUPPLEMENT</p>\n<p>It is easily absorbed by the body, becomes a source of additional energy.</p>\n<p>Increases endurance, restores muscles after active training, makes connective tissues elastic.</p>\n<p>Prevents muscle catabolism, participates in anabolic processes, prevents the destruction of muscle tissue.</p>\n<p>Improves strength indicators during training, stimulates the growth of dry muscle mass.</p>\n<p>Activates metabolism, normalizes the hormonal background, stimulates the production of growth hormone.</p>\n<p>Improves performance, has a refreshing, restorative effect.</p>\n<p>Relieves chronic fatigue, gives a feeling of cheerfulness for the whole day.</p>\n<p>Strengthens the immune system, helps to remove cholesterol and slags from the body.</p>\n<p>Stimulates regenerative functions, helps to recover faster after diseases, injuries.</p>\n<p>The composition does not contain cholesterol, sugar, caffeine, the additive is not addictive.</p>'),
(10, 'BCAA 500', '2022-01-13 14:39:15.218558', '2022-01-15 14:12:41.000000', 1, NULL, 111, '[{\"name\": \"L-Leucine\", \"value\": \"2.5 g\"}, {\"name\": \"L-Valine \", \"value\": \"1.25 g\"}, {\"name\": \"L-Isoleucine\", \"value\": \"1.25 g\"}]', 789, 'bcaa-500', '<p>In order for muscle tissues to recover quickly after increased loads, strength indicators, endurance increased, there is a dietary supplement BCAA 5000 Powder. The concentrated preparation from Optimum Nutrition is quickly absorbed by the body after consumption, enters directly into the body. It restores muscle performance, relieves fatigue, activates internal reserves.</p>\n<p>WHAT GIVES REGULAR INTAKE OF BCAA 5000 POWDER OPTIMUM NUTRITION</p>\n<p>Active growth of lean muscle mass, rapid burning of the fat layer, optimal concentration of essential amino acids in cells.</p>\n<p>Hidden reserves are activated, the body recovers faster after stress, intensive training, injuries.</p>\n<p>Catabolism is suppressed, the process of destruction of muscle tissue slows down.</p>\n<p>Metabolism is stimulated, the general condition and hormonal background improves.</p>\n<p>The effectiveness of other dietary supplements used in conjunction with BCAA 5000 increases.</p>\n<p>Strength indicators and endurance are growing with increased physical exertion.</p>\n<p>ADVANTAGES OF BCAA 5000 WITHOUT TASTE FROM OPTIMUM NUTRITION</p>\n<p>Activates cellular metabolism, removes toxins and slags</p>\n<p>Eliminates chronic fatigue, gives a feeling of cheerfulness, a surge of strength during the day.</p>\n<p>Fat deposits are actively burned, after which an active set of muscle mass occurs.</p>\n<p>After taking it, there is an increased concentration of insulin in the blood against the background of the absence of sugar in the product itself.</p>\n<p>The healing of microcracks in muscle fibers accelerates, the body recovers faster after injuries.</p>\n<p>Blood circulation is activated, the digestive system improves.</p>\n<p>Vitamins, minerals, and trace elements received during meals are better absorbed.</p>\n<p>The metabolism of free amino acids is normalized, protein synthesis in the muscles is accelerated. Enhanced workouts become as effective as possible, the threshold of muscle fatigue increases.</p>\n<p>It has an anabolic effect, protects muscle fibers from oxidation.</p>\n<p>It has no strict contraindications and side effects. Suitable for professional athletes and those who play sports after recovering injuries and maintaining health.</p>\n<p>The dietary supplement from Optimum Nutrition is 100% absorbed by the body. It has hydrophilic properties, removes cholesterol, gets into the body, does not settle on the walls of blood vessels.</p>'),
(11, 'ARAXISOVAYA PASTE IZYUM-KORISA', '2022-01-13 14:43:07.291732', '2022-01-13 14:43:07.291732', 1, NULL, 42, '[{\"name\": \"Eat \", \"value\": \"40-70 g per day\"}]', 134, 'araxisovaya-paste-izyum-korisa', '<p>Millions of people in many countries of the world cannot imagine breakfast without toast smeared with viscous, fragrant, creamy butter. Consisting of more than 90% nuts, the product is liked by many adults and children and has been very popular in Western countries for many years.</p>\n<p>Given its high-protein composition (about 25%) and the presence of useful elements, it is especially valuable for those who are fond of fitness and lead an active healthy lifestyle.</p>\n<p>dignities</p>\n<p>A highly concentrated protein product is in high demand among many categories of consumers. Everyone likes its texture and pleasant chocolate taste. The main component is natural bitter chocolate 70%, so it will certainly appeal to cocoa lovers.</p>\n<p>&nbsp;</p>\n<p>In bodybuilding, most people prefer to include crispy whole-grain bread with a sweet supplement in their diet. Such a healthy snack allows you to forget about the feeling of hunger for a long time, replenishing your daily menu with the necessary micro and macro elements. Among the positive aspects are:</p>\n<p>Effective satisfaction of hunger.</p>\n<p>Reducing the risk of cardiovascular diseases. Polyunsaturated fatty acids included in its structure, unlike saturated animals, have a beneficial effect on the tone of blood vessels and capillaries;</p>\n<p>Impressive nutritional value. With intensive training, the body needs a sufficient amount of energy for its functioning.</p>\n<p>A source of real vegetable protein.</p>\n<p>This is a storehouse of valuable substances that we need all the time. B vitamins, vitamin E, resveratrol, magnesium and zinc are an incomplete list of important micro and macroelements that guard the immune system.</p>\n<p>Many appreciated the benefits of this type of breakfast. Moreover, it is often used as a snack between main meals to maintain a standard blood sugar level and avoid its sharp fluctuations.</p>'),
(12, 'NOTVIT SILLIK BULGANLARDACHI', '2022-01-13 14:45:43.044453', '2022-01-16 10:06:03.000000', 1, NULL, 440, '[{\"name\": \"Fats \", \"value\": \"46 g\"}, {\"name\": \"Carbohydrates \", \"value\": \"14 g\"}, {\"name\": \"Protein \", \"value\": \"25 g\"}]', 179, 'notvit-sillik-bulganlardachi', '<p>Ostrovit has developed peanut butter as another delicious treat for athletes and those who tirelessly take care of their figure. It is distinguished by:</p>\n<p>excellent taste,</p>\n<p>natural composition,</p>\n<p>no sugar and salt in the composition,</p>\n<p>unique cooking technology,</p>\n<p>high energy efficiency.</p>\n<p>Peanut butter can be used as a paste for sandwiches or an additive for cocktails. In addition, the mass can be added to porridges and other dishes to achieve a radically different, fresh taste</p>\n<p>THE PECULIARITY OF COOKING AND VARIETY</p>\n<p>Peanut butter contains in its composition only natural nuts, crushed by special technology. Before making peanuts, they undergo mandatory roasting. The procedure is carried out in the natural shell of nuts, which prevents carcinogens and cholesterol from penetrating into the product itself.</p>\n<p>The manufacturer offers two versions of peanut butter: with pieces of nuts and a homogeneous consistency. The composition and properties do not change from this. This feature is designed only for the taste needs of the buyer.</p>\n<p>BENEFITS AND INDICATIONS OF OSTROVIT PEANUT BUTTER</p>\n<p>Peanut butter contains the maximum amount of protein needed by a person during intense exercise. It is fully able to saturate the body with the necessary amount of energy and nourish it throughout the day. In addition, the product has an unsurpassed taste. As a result, a person receives the maximum amount of energy without depriving himself of the pleasure of eating delicious food.</p>'),
(13, 'CREATINE PH-X', '2022-01-13 14:52:51.377753', '2022-01-15 18:56:04.000000', 1, NULL, 53, '[{\"name\": \"Calorie content\", \"value\": \"33 kcal\"}, {\"name\": \"Fats\", \"value\": \"0.76 g\"}, {\"name\": \"Carbohydrates\", \"value\": \"0.21 g\"}]', 518, 'creatine-ph-x', '<p>Creatine in Biotech capsules is the result of many years of development by the best specialists of BioTech. This is a universal tool designed for thinking athletes. It is popular in 52 countries around the world and is one of the most popular on the sports pit market.</p>\n<p>COMPOSITION OF CREATINE PHX BIOTECH</p>\n<p>Creatine P. H. X from Biotech, by its chemical composition, belongs to the group of carboxylic acids. It contains some nitrogen. In fact, it is a substance of natural origin. It is present in the body, and is produced in small amounts throughout life. In order to maintain synthesis, amino acids are required: arginine, methionine and glycine. It becomes clear that the body itself cannot synthesize a sufficient volume of this compound. And athletes need to constantly replenish its reserves, because it is in the muscles and directly affects their work and growth.</p>\n<p>To achieve the best results, it is necessary that enough energy is supplied to the muscle fibers. It appears in the process of splitting fats and carbohydrates, which are converted into a special molecule &ndash; ATP. Creatine is very important for its biosynthesis. It creates ATP from a precursor, ADP. Without it, the process of releasing high-energy molecules is much slower.</p>\n<p>&nbsp;</p>\n<p>That is why Creatine Ph X Biotech is used so often by trainees. It allows you to increase strength indicators, build solid muscles and get extra energy for training. This supplement uses a special form of the active ingredient - buffered creatine. This way the compound is better absorbed and transported faster to muscle cells.</p>\n<p>POSITIVE EFFECTS OF CREATINE PH-X BIOTECH</p>\n<p>A noticeable increase in strength, endurance, increased intensity and effectiveness of training.</p>\n<p>The addition of dry mass, the drawing of the relief. Studies have shown that in 1 month you can gain up to 5 kg with proper nutrition and a training regime.</p>\n<p>Suppresses the formation of myostatin, which destroys muscles.</p>\n<p>Acts as a buffer for lactic acid. Reduces fatigue and eliminates unpleasant sensations during training. Great for beginners who do not tolerate muscle pain and serious stress.</p>\n<p>It is important to combine Creatine Phx with regular exercise, healthy eating and maintaining water-salt balance.</p>\n<p>Athletes claim that this remedy really has all the claimed effects. Athletes talk about increasing endurance over long distances, bodybuilders talk about building solid muscles. It is also important that this drug is suitable for girls. There are no side effects, according to comments on the Internet.</p>\n<p>You can purchase Creatine Ph-x in our store. We offer a wide range and prices from manufacturers.</p>'),
(14, 'PURE CREATINE', '2022-01-13 14:55:06.021922', '2022-01-16 19:22:56.000000', 1, NULL, 84, '[{\"name\": \"Creatine monohydrate\", \"value\": \"3000 mg\"}]', 399, 'pure-creatine', '<p>For muscle growth, a protein cocktail is needed, an amino acid complex is used to fight cortisol, a high-quality fat burner is used for relief, and a creatine supplement is used directly for work. Pure Creatine from the world-famous sports nutrition manufacturer Weider contains pure creatine monohydrate powder - the most effective form of creatine due to the presence of a water molecule in the chemical formula.</p>\n<p>CREATINE MONOHYDRATE HAS THE FOLLOWING ADVANTAGES:</p>\n<p>resistant to the effects of gastric juice (thanks to this, Vader Pue Creatine is not destroyed in the stomach and reaches the muscles unchanged);</p>\n<p>longer duration of action compared to other types of creatine (since monohydrate is converted more slowly to creatinine &ndash; the end product of the ATP production reaction in muscle fibers);</p>\n<p>there is no need for a loading phase (Pure Creatine loading can be carried out, but not necessarily, one phase of maintaining creatine levels is quite enough);</p>\n<p>proven effectiveness (unlike a whole bunch of new creatine derivatives, monohydrate is safe, increases endurance by 10-15% and gives 2 - 5 kg of muscle gain after 1-3 months of strength training, which is confirmed by numerous independent studies);</p>\n<p>the ability to retain fluid in muscle cells (that\'s why after taking Pure Creatine, muscles become visually large; however, it should be noted here that if such an effect plays into the hands of a bodybuilder, then it will interfere with an athlete).</p>\n<p>Creatine - the active substance of Weider Pure Creatine - is synthesized in the body without the help of a dietary supplement and even accumulates in skeletal muscles (the pool is 120 - 130 g). But with intensive training, the consumption of the substance increases significantly: it binds to phosphorus and forms the compound phosphocreatin, whose task is to release energy from ATP molecules. The body is not able to independently replenish the balance of creatine lost in such a huge amount. In order to avoid overwork, as well as to increase the energy potential of muscle cells, it is necessary to take Vader Pure Creatine.</p>\n<p>AFTER TAKING WEIDER PURE CREATINE , THE FOLLOWING WILL BE OBSERVED:</p>\n<p>an increase in strength and short-term anaerobic endurance (here you should pay attention to the fact that Vader Pue Creatine \"works\" only with explosive force, for example, during a week of training it helps to switch from 8 reps in the bench press to 10);</p>\n<p>increased muscle growth;</p>\n<p>inhibition of the production of myostatin, which prevents the formation of muscles;</p>\n<p>stimulation of the synthesis of somatotropin and testosterone, which have an anabolic, anti-catabolic and fat-burning effect;</p>\n<p>inhibition of the release and action of lactic acid, which causes a burning sensation in the muscles after physical exertion.</p>\n<p>WEIDER PURE CREATINE IS NEEDED BY THOSE WHO:</p>\n<p>engaged in sports in which there is a power component or repetitive high-intensity movements (jerks, throws, jumps);</p>\n<p>strives to pump up muscles and make them more \"full\";</p>\n<p>he wants to reduce the amount of fat (it is the percentage of fat, not the weight &ndash; the latter may even increase slightly due to water retention);</p>\n<p>adheres to a vegetarian diet (the main food source of creatine is meat);</p>\n<p>he just takes care of his health (creatine also removes cholesterol, relieves inflammation and protects the central nervous system).</p>\n<p>important! Vader Pure Creatine can be taken not only for men, but also for girls, especially when it comes to the formation of a beautiful female figure.</p>'),
(15, 'KREA7 SUPERALKALINE', '2022-01-13 14:58:06.465247', '2022-01-16 18:31:02.000000', 1, NULL, 87, '[{\"name\": \"Sodium bicarbonate\", \"value\": \"300 mg\"}, {\"name\": \"Tri-creatine malate \", \"value\": \"801 mg\"}]', 599, 'krea7-superalkaline', '<p>IronMaxx Krea7 Superalkaline is a tablet buffered creatine from a German manufacturing company, which, due to an improved formula, is designed not so much to increase explosive power as to increase the volume of lean muscle mass and eliminate crepature after intense physical exertion. The dietary supplement works without a loading phase and does not accumulate liquid.</p>\n<p>FEATURES OF THE COMPOSITION OF KREA 7</p>\n<p>Ironmax Crea7 Superalcalin contains a unique combination of six types of creatine, each of which, due to its combination with molecules of other substances, is characterized by better absorption and a stronger effect compared to monohydrate. The product contains in equal proportion:</p>\n<p>tricreatin malate - due to the presence of malic acid, it has an anti-inflammatory effect, stimulates blood circulation and, since it dissolves well in water, does not cause side effects from the gastrointestinal tract;</p>\n<p>tricreatin citrate &ndash; thanks to citric acid involved in the Krebs cycle &ndash; a source of additional energy - increases endurance;</p>\n<p>creatine phosphate - promotes the release of energy from the ATP molecule by separating the phosphate group (there is pure creatine in the skeletal muscles of an athlete, but by itself it has no effect on energy metabolism; it combines with phosphorus to supply muscles with energy, but since phosphocreatin comes together with a dietary supplement already initially in a ready-made form, the body does not need to use phosphorus necessary for mental activity, protein synthesis and growth of dental tissue);</p>\n<p>creatine pyruvate - contains pyruvic acid, as a result of which it is 25% more effective than monohydrate, removes excess fat and is absorbed without the use of insulin;</p>\n<p>creatine alpha-ketoglutarate - contains alpha-ketoglutaric acid (AKG) - a substance that ensures the delivery of the entire volume of the active component to muscle cells, due to which creatine does not remain on the cell membrane, which could cause water retention in muscles;</p>\n<p>ethyl ether creatine malate - accelerates the transportation of the active substance, easily dissolves in fats, thus getting into the lymph, enhances protein production, therefore, in a lower dosage gives a better result than monohydrate in a larger one.</p>\n<p>The dietary supplement is enriched with sodium bicarbonate, which increases the pH to 7-14 and neutralizes the effect of lactic acid, which causes muscle pain.</p>\n<p>&nbsp;</p>\n<p>THE USE OF THE MEDIUM</p>\n<p>The action of IronMaxx Krea7 Superalkaline is aimed at:</p>\n<p>mobilization of the body\'s energy resources;</p>\n<p>increase in strength;</p>\n<p>stimulation of the production of somatotropin and testosterone, which exhibit anabolic and anti-catabolic effects;</p>\n<p>elimination of painful sensations after training;</p>\n<p>resorption of cholesterol plaques;</p>\n<p>normalization of the nervous system.</p>\n<p>WHO NEEDS TO TAKE THE DRUG?</p>\n<p>Traditionally, creatine supplements are used by athletes who are somehow subject to short-term power loads (these can be both weightlifters with boxers and runners with football players). Iron Max Crea7 Superalkaline also increases productivity for a short time, but thanks to a truly powerful formula, it is much stronger than other sports nutrition:</p>\n<p>stimulates muscle growth;</p>\n<p>reduces the amount of subcutaneous fat;</p>\n<p>improves the relief of the body.</p>\n<p>The product is suitable for both men and women. Vegetarians (even those who do not exercise) need it to restore creatine reserves, the main source of which is meat, and regulate acid-base balance.</p>'),
(16, 'BCAA 8-1-1', '2022-01-16 10:50:44.729056', '2022-01-16 18:31:02.000000', 1, NULL, 113, '[{\"name\": \"Leucine \", \"value\": \"6400 mg\"}, {\"name\": \"Isoleucine \", \"value\": \"800 mg\"}, {\"name\": \"Valine \", \"value\": \"800 mg\"}]', 219, 'bcaa-8-1-1', '<p>Ostrovit decided to release a BCAA complex with a unique combination of amines and did not lose.</p>\n<p>To begin with, in Bcaa 8:1:1, Ostrovit used amino acids in an unusual combination. Leucine outnumbers valine and isoleucine by eight times at once, and not by two, as usual. Admittedly, this experiment turned out to be successful and the product almost immediately became popular.</p>\n<p>Among all amino acids, BCAAs are probably the most in demand. And the point here is not that they are the main component of the synthesis of muscle tissues. These substances are widely used in most other biochemical reactions.</p>\n<p>FEATURES OF THE 8:1:1 RATIO</p>\n<p>It is no accident that the corporation\'s specialists applied a non-standard formula for the ratio of these components. Amino acids are not only actively involved in the creation of new muscle fibers, but also affect the rate of assimilation of aliphatic acid. This substance is known for regulating the dynamics of increasing the concentration of fat.</p>\n<p>As a result, with a high content of the above hormone, you will be able to protect your muscles even under conditions of using a strict dietary nutrition program. If you intend to conduct a drying course, then you should buy bcaa 8-1-1. However, a similar recommendation can be given to those bodybuilders who are gaining weight.</p>\n<p>This will allow you to make your cycles more fruitful, the body will not suffer from energy deficiency, the time for its recovery after training will be sharply reduced. BCAAs are vital for every athlete who takes bodybuilding seriously.</p>\n<p>REVIEWS OF BCAA 8 1 1 OSTROVIT</p>\n<p>Bodybuilders have perfectly accepted the appearance of bcaa 8 1 1 on the market. This supplement is very effective, and all athletes point to only one drawback - it ends quickly, and it is quite difficult to find it. There are no problems with this in our sportpit store.</p>\n<p>Here you can buy sports nutrition BCAA OstroVit BCAA 8-1-1 with fast delivery to Kiev and other cities of Ukraine.</p>'),
(17, 'THERMO DRINE COMPLEX', '2022-01-16 10:54:19.888364', '2022-01-16 10:54:19.888364', 1, NULL, 24, '[{\"name\": \"L-Carnitine tartrate \", \"value\": \"850 mg\"}, {\"name\": \"Mate extract\", \"value\": \"125 mg\"}, {\"name\": \"Caffeine \", \"value\": \"100 mg\"}]', 334, 'thermo-drine-complex', '<p>Thermo Drine Complex BioTech is a unique fat burner. It was created on the basis of the author\'s research. It helps to cope with excess weight in the shortest possible time. The composition contains thermogenic elements that work as quickly as possible. The main advantage is harmlessness. The lysis of lipid cells does not occur to the detriment of metabolism. According to the manufacturer, using this additive, you can dry out or lose kilograms.</p>\n<p>THERMO DRINE COMPLEX - WHAT IS IT?</p>\n<p>Thermo Drive is a Biotech complex, in the development of which the latest scientific information about metabolism was applied. Therefore, it causes a number of important changes. High-quality thermogenics are very popular on the market. And for good reason. They not only destroy subcutaneous tissue, but also slow down the formation of new deposits. The chemical formula provides for a targeted action, that is, the compounds in the composition of this complex affect specific cells and participate in specific reactions. Specialists from BioTech have tried to create a truly convenient tool. It does not contain aggressive stimulants, so there are no special contraindications for taking it, and harm to health is excluded.</p>\n<p>The advantages include:</p>\n<p>Acceptable cost</p>\n<p>Control over production at all stages</p>\n<p>Expert confirmation of compliance of real and declared characteristics</p>\n<p>Lots of comments from satisfied customers</p>\n<p>No harmful or untested components</p>\n<p>It does not affect the heart rhythm and vascular tone, therefore it is absolutely safe</p>\n<p>EFFECTS FROM THERMO DRINE COMPLEX BIOTECH</p>\n<p>Acceleration of the fat burning process</p>\n<p>Due to the increased caffeine content, it allows you to withstand long-term anaerobic trainings</p>\n<p>Increased heat production by the body is a big waste of energy and, accordingly, calories</p>\n<p>Enhances concentration and mindfulness</p>\n<p>Increases stamina and causes an increase in strength</p>\n<p>Green tea extract gives a boost of energy and reduces fatigue</p>\n<p>Mate leaves soothe the central and autonomic nervous system</p>\n<p>WHO IS SUITABLE FOR A THERMO DRIVE COMPLEX</p>\n<p>First of all, Thermo Drine Biotech is suitable for those who want to bring their body into perfect condition and achieve the correct percentage of subcutaneous fat. The destruction of lipids occurs in a passive mode, that is, it works even during rest. And during training, the effect is enhanced. Recommended for drying. Gives relief and firmness to the muscles.</p>\n<p>They are taken in the morning, at this point the stimulants are better absorbed. They drink three capsules at a time. Suitable for both men and women. The only contraindication is pregnancy.</p>\n<p>Thermo Drive Biotech is used by both beginners and professionals. They leave good reviews. They note an improvement in well-being, an increase in energy levels, and weight loss. Beginners say that it becomes easier for them to transfer training in an oxygen-free zone.</p>\n<p>You can buy it in our store. We offer favorable prices and a large selection.</p>\n<p>On the website you can buy sports nutrition fat burner BioTech THERMO DRINE Complex with delivery to different cities of Ukraine.</p>'),
(18, 'BLACK SPIDER', '2022-01-16 10:55:42.804329', '2022-01-16 10:55:42.804329', 1, NULL, 57, '[]', 599, 'black-spider', '<p>How to lose weight and get rid of excess body fat? The most effective way is specialized tools designed for thinking athletes.</p>\n<p>Independent attempts to remove subcutaneous tissue take too much time and are not always successful. It is necessary to use a fat burner. One of the best is considered to be Black Spider (Black Widow spider). It is designed for everyone who wants to get a slim and toned body. It is actively used by professional bodybuilders.</p>\n<p>This is a drug from the famous brand Cloma Pharma. First of all, it is produced for performing bodybuilders. It is not forbidden to buy and engaged in the middle level, but it has an incredibly powerful effect, so you need to take it very carefully. The main substance is ephedrine. In addition to it, the composition includes various plant extracts necessary for complete assimilation.</p>\n<p>Contains 25 mg of ephedra. This is exactly the amount that burns fat, but does not harm the body. The caffeine in this supplement is almost 400 mg, so it stimulates the muscles and the heart as much as possible. Previously, aspirin was used in energy companies, but it was recognized as unsafe. In this remedy, instead of it, there is willow extract, a natural analogue of acetylsalicylic acid. All components are perfectly combined and give a strong combined effect.</p>\n<p>STRENGTHS OF BLACK SPIDER</p>\n<p>Extra-efficiency due to balanced composition</p>\n<p>Affordable price</p>\n<p>Absence of serious contraindications</p>\n<p>Created on the basis of substances of natural origin</p>\n<p>Does not contain aggressive compounds</p>\n<p>The dosage is carefully calculated</p>\n<p>Passed expert control</p>\n<p>Recommended by leading experts</p>\n<p>EFFECTS OF BLACK SPIDER</p>\n<p>Thermogenic mechanism of action</p>\n<p>Excites the nervous system and improves conduction through neural networks</p>\n<p>Reduces appetite</p>\n<p>Improves performance, both metal and physical</p>\n<p>Increases training productivity</p>\n<p>Gives relief, firmness to muscles</p>\n<p>Promotes concentration of attention</p>\n<p>B vitamins protect the immune system, the heart, have a restorative effect</p>\n<p>Cayenne pepper, green tea and ginger extract are a thermogenic complex</p>\n<p>Theobromine and phenylethylamine improve mood and motivation</p>\n<p>Two weeks before the reception, you need to follow a diet. The first time they drink 1 tablet, then two. It is important not to forget to saturate the body with water. Not compatible with pre-workout complexes. But it can be combined with CLA and MCT. It is worth stopping the course by gradually reducing the dose.</p>\n<p>Despite the fact that this fat burner is suitable mainly for speakers, fans also leave comments. The first say that it makes it possible to quickly get in shape before the competition. Beginners notice changes already from the beginning of the course, they feel a surge of strength and a steady decrease in the percentage of fat.</p>\n<p>You can buy on our website without leaving your computer. It is enough to choose a convenient payment method, place an order.</p>\n<p>Here you can buy a complex fat burner Cloma Pharma Black Spider with fast delivery to Kiev, Kharkiv, other cities of Ukraine.</p>'),
(19, 'METHYLDRENE 25', '2022-01-16 10:58:46.920777', '2022-01-16 11:22:54.000000', 1, NULL, 87, '[{\"name\": \"Methylsinephrine \", \"value\": \"20 mcg\"}, {\"name\": \"White willow bark\", \"value\": \"100 mg\"}, {\"name\": \"Ephedra extract\", \"value\": \"25 mg\"}]', 599, 'methyldrene-25', '<p>This is an extremely popular fat burner. It is produced by a world-renowned company - Cloma Pharma. This drug is one of a whole line of energy drinks. The main components are the triad known to all athletes, anhydrous caffeine, ephedrine and aspirin. This combination is usually called EKA. It is worth noting that this tool is in demand not only among bodybuilders, but also among representatives of other sports. It allows you to reduce the percentage of fat in the body and give the muscles relief. Indispensable for drying.</p>\n<p>Many people mistakenly believe that training and diet are enough to get an ideal body. Of course, proper nutrition and a well-thought-out training plan are extremely important, but it is not so easy to achieve a dry mass. We have to use special drugs. Among them, those produced by Cloma Pharma stand out favorably. After all, the specialists of this corporation know everything about the athlete\'s body. They claim that taking supplements together with observing the rules of nutrition makes it possible to burn fat quickly and without unnecessary costs.</p>\n<p>METHYLDRENE 25 is a complex that enhances the processes of lipid breakdown, has a thermogenic effect, increases the production of adrenaline. Allows you to control your appetite. All components of the mixture are contained in precisely calculated proportions and have a synergistic effect.</p>\n<p>In addition to the EKA triad, the composition includes other ingredients: extracts of ginseng and yohimbe, green tea, B vitamins, ginger extract. They improve absorption and stimulate the activity of the central nervous system. They are the strongest antioxidants, relieve fatigue, restore vigor, and give motivation.</p>\n<p>POSITIVE QUALITIES OF METHYLDRENE</p>\n<p>Safety and absence of contraindications</p>\n<p>Balanced complex</p>\n<p>Tested and recommended by experts</p>\n<p>Clear instructions with a full description of the characteristics</p>\n<p>EFFECTS OF METHYLDRENE 25</p>\n<p>Tones, energizes</p>\n<p>Quickly eliminates fat deposits and slows down the production of new lipid molecules</p>\n<p>Blocks cholesterol and removes it</p>\n<p>Regulates nerve conduction</p>\n<p>Helps reduce food intake</p>\n<p>Activates anabolism</p>\n<p>Improves the tolerance of classes in the anaerobic zone</p>\n<p>The results are visible from the first days</p>\n<p>Stimulates the processes of natural thermoregulation</p>\n<p>Maintains the heart rate at a normal level</p>\n<p>Take in an amount of 1-3 capsules per day. Start with one capsule, gradually increasing the dosage. Before the training, they drink for 40 minutes. Reminder from manufacturers: it is better to refrain from combining with other fat burners.</p>\n<p>Athletes claim that their well-being improves immediately. Weight loss occurs gradually, the extra pounds then do not return. Experts in the field of sports nutrition recommend using this supplement on drying.</p>\n<p>You can purchase this tool on our website. We offer favorable prices, the possibility of instant ordering and several payment methods. Best price for Methyldrene 25 on bodymarket.ua .</p>'),
(20, 'OMEGA 3', '2022-01-16 11:08:05.387703', '2022-01-16 18:31:02.000000', 1, NULL, 40, '[{\"name\": \"Calories\", \"value\": \"10 kcal\"}, {\"name\": \"Fats\", \"value\": \"1 g\"}, {\"name\": \"Cholesterol\", \"value\": \"10 mg\"}]', 225, 'omega-3', '<p>THE MECHANISM OF ACTION OF OMEGA 3 PURITAN PRIDE</p>\n<p>Once in the body, omega-3 (unsaturated fatty acids) begins to stimulate the production of natural prostaglandins that regulate fat metabolism and eliminate the centers of inflammatory processes, and testosterone, which increases muscle volume. At the same time, Omega 3 1000 mg 100 caps suppresses the secretion of cortisol &ndash; the so-called stress hormone that provokes an increase in blood pressure and glucose concentration in the blood.</p>\n<p>THE RESULT OF TAKING OMEGA 3 PURITAN\'S PRIDE</p>\n<p>Omega 3 1000 mg is absorbed easily and quickly, has a neutral taste and is a powerful source of energy for an athlete. Already after the first intake of the product , there is:</p>\n<p>gain of dry muscle mass;</p>\n<p>increase endurance during training;</p>\n<p>acceleration of metabolism;</p>\n<p>protection of muscle tissue from destruction;</p>\n<p>weight loss in the abdomen and pelvis;</p>\n<p>normalization of weight;</p>\n<p>rapid regeneration of wounds and scars;</p>\n<p>strengthening bones;</p>\n<p>mood boost;</p>\n<p>improving mental abilities;</p>\n<p>resorption of cholesterol plaques.</p>'),
(21, 'XTEND', '2022-01-16 16:21:14.840769', '2022-01-16 18:49:55.000000', 1, NULL, 77, '[{\"name\": \"Leucine \", \"value\": \"3500 mg\"}, {\"name\": \"Isoleucine \", \"value\": \"1750 mg\"}, {\"name\": \"Valine \", \"value\": \"1750 mg\"}]', 1499, 'xtend', '<p>Scivation Xtend is considered one of the most effective complexes based on amino acids essential for muscle tissue. It is a recognized tool among both professionals and trainers, is included in the rating of the best sports supplements on the world market.</p>\n<p>BENEFITS OF BCAA XTEND</p>\n<p>Thanks to a unique patented formula and well-chosen ingredients that perfectly combine with each other, bcaa x tend has pronounced energy-saving and anabolic properties. Its composition includes:</p>\n<p>7 grams of branched-chain amino acids - leucine, isoleucine and valine. They are necessary for the growth of muscle cells, to normalize the energy balance in the body, to increase immune defenses, as well as to slow down the breakdown of muscle fibers (catabolism) during periods of rest and recovery. Without these amino acids, protein synthesis is impossible, as well as metabolism, which allows you to reduce the fat layer in the body.</p>\n<p>2.5 grams of glutamine, which is responsible for the restoration of destroyed tissues damaged during periods of stress. This amino acid is often called \"growth hormone\", because it also contributes to the development of muscles.</p>\n<p>1 gram of citrulline, which does not take part in the construction of muscle tissue directly, but activates blood circulation in this area, promotes rapid excretion of decay products (or so-called lactic acid) from the body, and therefore allows every athlete to feel easily and freely throughout the day.</p>\n<p>10 milligrams of vitamin B6, which will take care of the immune system, will become the basis for the rapid assimilation of enzymes, and will also be a tool for maintaining the normal functioning of the circulatory system and thyroid gland.</p>\n<p>In the Scivation X Tend complex, all these ingredients are thoroughly mixed and presented in the form of a powdered mixture. It is recommended to dilute it in water, since BCAA has different flavors. For example, amino acids with pineapple or mango flavors are suitable for women. But athletes prefer lime, lemon and grape supplements more.</p>\n<p>TO WHOM IS SCIVATION XTEND RECOMMENDED?</p>\n<p>First of all, the amino acid complex Scivation Xtend is recommended for athletes who want to prevent the catabolic process in the body during periods of rest from training. Since the product has strong restorative properties, it will also be useful for those who have been injured and want to return to classes faster.</p>\n<p>The supplement is suitable for athletes, bodybuilders and other athletes who dream of building up \"dry\" muscle tissue without fat layers and deposits. The use of the product will help to correct the figure and relief of the whole body.</p>\n<p>Due to the unique composition of Scivation Xtend, it will also be useful for those who feel very tired after classes and exercises. The complex will resist the active production of tryptophan, and therefore it is possible to increase the intensity according to the schedule without consequences.</p>\n<p>And finally, the amino acid complex is recommended for those who have already chosen BCAA for themselves, but for a number of reasons did not tolerate its intake well and felt discomfort in the gastrointestinal tract. And in the product in question, the components are responsible, among other things, for improving digestive processes.</p>\n<p>resume</p>\n<p>Thus, Scivation Xtend is a modern supplement that is necessary for the natural growth of muscle tissue and improving overall well-being. You can take it with you and, thanks to a convenient jar, it is easy to store. Therefore, he will always be there when it is especially necessary for an athlete &ndash; during the recovery period or before the start of training to replenish energy reserves.</p>\n<p>Here you can buy BCAA Scivation Xtend sports nutrition with fast delivery to Kiev, Kharkiv, Donetsk, Dnepropetrovsk, Lviv (all Ukraine) - we have the best price.</p>'),
(23, 'BCAA PLUS', '2022-01-16 19:31:23.744111', '2022-01-17 07:43:30.000000', 1, NULL, 76, '[{\"name\": \"Isoleucine \", \"value\": \"750 mg\"}, {\"name\": \"Valine \", \"value\": \"750 mg\"}, {\"name\": \"Vitamin B6\", \"value\": \"27 mg\"}]', 309, 'bcaa-plus', '<p>MyProtein BCAA PLUS is a reliable, time-tested dietary supplement produced under the trademark \"MyProtein\" (UK), which does not let its adherents down. Comlpex BCAA, consists of three essential amino acids necessary for the athlete\'s body: isoleucine / valine / leucine. The high efficiency of a high-quality amino acid complex of a high degree of purification has been proven, especially if the task is to achieve outstanding results in work and/or in sports. Along the way, you can stock up on an additional charge of energy, improve the well-being and cheerfulness characteristic of a healthy person, become more persistent in achieving your goals.</p>\n<p>COMPOSITION OF MY PROTEIN BCAA PLUS</p>\n<p>The molecules of amino acids that are part of the complex, the human body is not able to synthesize independently. Getting the necessary amount of them daily with regular food is also problematic. Also, the lack of BCAA (branched chain amino acids) is easily compensated with the help of sports nutrition products - regular intake of high-quality supplements (such as the tablet form of BCAA PLUS, consisting of three key nutrients supplemented with vitamin B6).</p>\n<p>formula</p>\n<p>The improved Bcaa Plus formula, which includes the most essential amino acids, effectively protects the organic glycogen depot from depletion and inhibits the degradation of muscle tissues in the training process. B6 supports innervation and proper metabolism. As a result, it gives a powerful impetus to progress, promotes the growth of muscles and tissues. The perfectly visible result of taking the drug is due, in particular, to the fact that amino acids after oral administration are directly delivered to the muscles, where they are included in the chains of biochemical synthesis reactions, without being destroyed by enzymes of the gastrointestinal tract.</p>\n<p>The BCAA PLUS drug from My Protein is the key to effective workouts. In addition, it will undoubtedly be useful to anyone who fundamentally chooses, instead of passive \"rest\" on the couch, an active full-fledged life, excellent physical fitness and fitness at any age.</p>'),
(25, 'product', '2022-01-16 19:58:07.396374', '2022-01-16 19:58:25.000000', 0, NULL, 2, '[]', 2, 'product', ''),
(27, 'CREATINE MONOHYDRATE OLIMP', '2022-01-17 08:01:07.327154', '2022-01-17 08:01:07.327154', 1, NULL, 78, '[{\"name\": \"Creatine monohydrate\", \"value\": \"5000 mg\"}]', 279, 'creatine-monohydrate-olimp', '<p>Creatine is a substance well-known in the high-achievement industry. It is accepted by both amateurs and serious professionals. It belongs to the group of biologically active compounds and allows you to stimulate the natural growth of muscles. The main advantage of preparations based on this macronutrient is proven safety and effectiveness. After all, creatine is produced in the body and is normally contained in muscle tissues. It is used to increase the effectiveness of training. Creatine in Olymp powder helps to overcome genetic barriers and get relief. Especially the intake of creatine monohydrate Olympus is recommended for ectomorphs who find it difficult to gain high-quality mass.</p>\n<p>COMPOSITION OF CREATINE OLIMP LABS</p>\n<p>Creatine monohydrate from a popular manufacturer - OlimpLabs. The main active compound is monohydrate. In this form, the main ingredient is better absorbed and transported to the cells faster. Creatine powder has been used for more than 20 years and during this time many thanks have been received, both from athletes and from experts in the field of sports nutrition. Most often, this product is purchased by bodybuilders who need to train with maximum efficiency.</p>\n<p>&nbsp;</p>\n<p>Creatine works like this: it restores the level of creatine phosphate, which in turn increases the synthesis of ATP - adenosine triphosphate, a high-energy molecule. As a result - an increase in strength, endurance, hypertrophy. The mass turns out to be of high quality, the muscles become firm and noticeable. The more ATP in the body, the more energy for exercise. Therefore, this supplement is useful for those who are tired during training or are just starting their sports career and cannot cope with increasing loads.</p>');

-- --------------------------------------------------------

--
-- Структура таблицы `products_categories_categories`
--

CREATE TABLE `products_categories_categories` (
  `productsId` int NOT NULL,
  `categoriesId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `products_categories_categories`
--

INSERT INTO `products_categories_categories` (`productsId`, `categoriesId`) VALUES
(8, 6),
(9, 6),
(10, 6),
(11, 7),
(12, 7),
(13, 8),
(14, 8),
(15, 8),
(16, 6),
(17, 9),
(18, 9),
(19, 9),
(20, 10),
(21, 6),
(23, 6),
(25, 12),
(27, 8);

-- --------------------------------------------------------

--
-- Структура таблицы `products_files_files`
--

CREATE TABLE `products_files_files` (
  `productsId` int NOT NULL,
  `filesId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `products_files_files`
--

INSERT INTO `products_files_files` (`productsId`, `filesId`) VALUES
(8, 50),
(9, 51),
(10, 52),
(11, 53),
(12, 54),
(13, 57),
(14, 58),
(15, 59),
(16, 60),
(17, 61),
(18, 62),
(19, 63),
(20, 64),
(21, 65),
(23, 67),
(27, 69);

-- --------------------------------------------------------

--
-- Структура таблицы `product_in_order`
--

CREATE TABLE `product_in_order` (
  `id` int NOT NULL,
  `productQuantity` int NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `productId` int NOT NULL,
  `orderId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `product_in_order`
--

INSERT INTO `product_in_order` (`id`, `productQuantity`, `createdAt`, `updatedAt`, `productId`, `orderId`) VALUES
(65, 2, '2022-01-16 10:00:35.460299', '2022-01-16 10:00:35.460299', 14, 45),
(66, 1, '2022-01-16 10:00:35.495221', '2022-01-16 10:00:35.495221', 13, 45),
(67, 1, '2022-01-16 10:00:39.330829', '2022-01-16 10:00:39.330829', 13, 44),
(68, 1, '2022-01-16 10:00:39.369283', '2022-01-16 10:00:39.369283', 14, 44),
(69, 1, '2022-01-16 10:00:39.386709', '2022-01-16 10:00:39.386709', 15, 44),
(70, 5, '2022-01-16 10:00:43.020287', '2022-01-16 10:00:43.020287', 14, 43),
(71, 1, '2022-01-16 10:00:43.041943', '2022-01-16 10:00:43.041943', 13, 43),
(72, 1, '2022-01-16 10:00:46.266501', '2022-01-16 10:00:46.266501', 9, 42),
(75, 1, '2022-01-16 10:12:38.040243', '2022-01-16 10:12:38.040243', 14, 46),
(76, 3, '2022-01-16 10:12:38.068939', '2022-01-16 10:12:38.068939', 12, 46),
(77, 1, '2022-01-16 11:21:40.623897', '2022-01-16 11:21:40.623897', 20, 47),
(78, 1, '2022-01-16 11:21:40.659648', '2022-01-16 11:21:40.659648', 19, 47),
(79, 1, '2022-01-16 11:22:54.905454', '2022-01-16 11:22:54.905454', 19, 48),
(80, 1, '2022-01-16 11:22:54.942141', '2022-01-16 11:22:54.942141', 20, 48),
(81, 1, '2022-01-16 18:31:02.614010', '2022-01-16 18:31:02.614010', 16, 49),
(82, 1, '2022-01-16 18:31:02.642977', '2022-01-16 18:31:02.642977', 15, 49),
(83, 1, '2022-01-16 18:31:02.686294', '2022-01-16 18:31:02.686294', 20, 49),
(84, 1, '2022-01-16 18:31:02.733025', '2022-01-16 18:31:02.733025', 21, 49),
(88, 2, '2022-01-17 07:43:30.556383', '2022-01-17 07:43:30.556383', 8, 51),
(89, 1, '2022-01-17 07:43:30.660449', '2022-01-17 07:43:30.660449', 23, 51);

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` enum('admin','moderator','customer') NOT NULL DEFAULT 'customer',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `color` varchar(255) NOT NULL DEFAULT 'purple'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`, `color`) VALUES
(1, 'customer', '2021-12-02 10:44:40.508241', '2021-12-28 09:44:15.979451', 'green'),
(2, 'moderator', '2021-12-02 10:44:40.508241', '2021-12-28 09:40:40.830207', 'purple'),
(3, 'admin', '2021-12-02 10:44:40.508241', '2021-12-28 09:43:59.374182', 'red');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `confirmedEmail` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `lastName`, `createdAt`, `updatedAt`, `confirmedEmail`) VALUES
(12, 'smjthebest@gmail.com', '$2b$10$bm97BOXe/9eXh.BHzJU8CuwpXf4OSSL.VHGwntIVmzHjK8fLZCU5a', 'Vitaliy', 'Vaskivskiy', '2022-01-12 18:28:47.431547', '2022-01-17 07:49:22.000000', 1),
(14, 'user@user.com', '$2b$10$I9XSdEP65nbYmHDzC.G2GeHFTVnfgaqv70ogk/fLEPMzHCJw7nfoq', 'Grorge', 'Grozer', '2022-01-15 19:21:52.444611', '2022-01-15 19:22:25.163666', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users_roles_roles`
--

CREATE TABLE `users_roles_roles` (
  `usersId` int NOT NULL,
  `rolesId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `users_roles_roles`
--

INSERT INTO `users_roles_roles` (`usersId`, `rolesId`) VALUES
(12, 1),
(12, 3),
(14, 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_420d9f679d41281f282f5bc7d0` (`slug`);

--
-- Индексы таблицы `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_151b79a83ba240b0cb31b2302d1` (`userId`);

--
-- Индексы таблицы `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_fe66ca6a86dc94233e5d778953` (`slug`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_464f927ae360106b783ed0b410` (`slug`),
  ADD KEY `FK_99d90c2a483d79f3b627fb1d5e9` (`userId`);

--
-- Индексы таблицы `products_categories_categories`
--
ALTER TABLE `products_categories_categories`
  ADD PRIMARY KEY (`productsId`,`categoriesId`),
  ADD KEY `IDX_40e7da0284a5389344605de8da` (`productsId`),
  ADD KEY `IDX_e1d833224b5be535323207473f` (`categoriesId`);

--
-- Индексы таблицы `products_files_files`
--
ALTER TABLE `products_files_files`
  ADD PRIMARY KEY (`productsId`,`filesId`),
  ADD KEY `IDX_ff4f911d05f23198b5108e08d1` (`productsId`),
  ADD KEY `IDX_30252246c71687341eecbb92b2` (`filesId`);

--
-- Индексы таблицы `product_in_order`
--
ALTER TABLE `product_in_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_28639dbdfa07984a9f51b6e57eb` (`orderId`),
  ADD KEY `FK_01830995952ed434c18ecce2c35` (`productId`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users_roles_roles`
--
ALTER TABLE `users_roles_roles`
  ADD PRIMARY KEY (`usersId`,`rolesId`),
  ADD KEY `IDX_df951a64f09865171d2d7a502b` (`usersId`),
  ADD KEY `IDX_b2f0366aa9349789527e0c36d9` (`rolesId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `files`
--
ALTER TABLE `files`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT для таблицы `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT для таблицы `product_in_order`
--
ALTER TABLE `product_in_order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_151b79a83ba240b0cb31b2302d1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_99d90c2a483d79f3b627fb1d5e9` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `products_categories_categories`
--
ALTER TABLE `products_categories_categories`
  ADD CONSTRAINT `FK_40e7da0284a5389344605de8dab` FOREIGN KEY (`productsId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_e1d833224b5be535323207473f1` FOREIGN KEY (`categoriesId`) REFERENCES `categories` (`id`);

--
-- Ограничения внешнего ключа таблицы `products_files_files`
--
ALTER TABLE `products_files_files`
  ADD CONSTRAINT `FK_30252246c71687341eecbb92b2a` FOREIGN KEY (`filesId`) REFERENCES `files` (`id`),
  ADD CONSTRAINT `FK_ff4f911d05f23198b5108e08d11` FOREIGN KEY (`productsId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `product_in_order`
--
ALTER TABLE `product_in_order`
  ADD CONSTRAINT `FK_01830995952ed434c18ecce2c35` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_28639dbdfa07984a9f51b6e57eb` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users_roles_roles`
--
ALTER TABLE `users_roles_roles`
  ADD CONSTRAINT `FK_b2f0366aa9349789527e0c36d97` FOREIGN KEY (`rolesId`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `FK_df951a64f09865171d2d7a502b1` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
