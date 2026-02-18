import { Product } from '../types';

export const products: Product[] = [
  // Footwear
  { id: 'p1', name: 'Classic White Sneakers', category: 'Footwear', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80', description: 'Minimalist white leather sneakers.' },
  { id: 'p2', name: 'Red Running Shoes', category: 'Footwear', price: 120.00, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', description: 'High-performance red running shoes.' },
  { id: 'p3', name: 'Leather Boots', category: 'Footwear', price: 150.00, imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b69f?auto=format&fit=crop&w=400&q=80', description: 'Durable brown leather boots.' },
  { id: 'p4', name: 'Summer Sandals', category: 'Footwear', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1621251399462-2384742442c6?auto=format&fit=crop&w=400&q=80', description: 'Comfortable open-toe sandals.' },
  { id: 'p5', name: 'High Top Canvas', category: 'Footwear', price: 65.00, imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80', description: 'Vintage style high top canvas shoes.' },
  { id: 'p6', name: 'Formal Oxfords', category: 'Footwear', price: 180.00, imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=400&q=80', description: 'Black polished oxford shoes.' },
  { id: 'p7', name: 'Hiking Boots', category: 'Footwear', price: 130.00, imageUrl: 'https://images.unsplash.com/photo-1628253747716-0c4f5c90fdda?auto=format&fit=crop&w=400&q=80', description: 'Rugged waterproof hiking boots.' },
  { id: 'p8', name: 'Slip-on Loafers', category: 'Footwear', price: 95.00, imageUrl: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=400&q=80', description: 'Casual suede slip-on loafers.' },
  { id: 'p9', name: 'Sport Trainers', category: 'Footwear', price: 110.00, imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80', description: 'Blue athletic training shoes.' },
  { id: 'p10', name: 'Ankle Boots', category: 'Footwear', price: 140.00, imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80', description: 'Stylish black ankle boots.' },

  // Clothing
  { id: 'p11', name: 'Denim Jacket', category: 'Clothing', price: 75.00, imageUrl: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=400&q=80', description: 'Classic blue denim jacket.' },
  { id: 'p12', name: 'Cotton T-Shirt', category: 'Clothing', price: 25.00, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80', description: 'Basic white cotton t-shirt.' },
  { id: 'p13', name: 'Summer Dress', category: 'Clothing', price: 60.00, imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80', description: 'Floral pattern summer dress.' },
  { id: 'p14', name: 'Wool Sweater', category: 'Clothing', price: 85.00, imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80', description: 'Cozy grey wool sweater.' },
  { id: 'p15', name: 'Chino Pants', category: 'Clothing', price: 55.00, imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=400&q=80', description: 'Beige slim-fit chino pants.' },
  { id: 'p16', name: 'Hooded Sweatshirt', category: 'Clothing', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80', description: 'Black oversized hoodie.' },
  { id: 'p17', name: 'Silk Blouse', category: 'Clothing', price: 90.00, imageUrl: 'https://images.unsplash.com/photo-1604176354204-9268737828c4?auto=format&fit=crop&w=400&q=80', description: 'Elegant emerald green silk blouse.' },
  { id: 'p18', name: 'Cargo Shorts', category: 'Clothing', price: 35.00, imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=400&q=80', description: 'Practical khaki cargo shorts.' },
  { id: 'p19', name: 'Blazer', category: 'Clothing', price: 150.00, imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80', description: 'Navy blue formal blazer.' },
  { id: 'p20', name: 'Rain Coat', category: 'Clothing', price: 110.00, imageUrl: 'https://images.unsplash.com/photo-1591852504445-5d666d92630a?auto=format&fit=crop&w=400&q=80', description: 'Yellow waterproof raincoat.' },

  // Accessories
  { id: 'p21', name: 'Leather Tote Bag', category: 'Accessories', price: 180.00, imageUrl: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=400&q=80', description: 'Spacious brown leather tote.' },
  { id: 'p22', name: 'Aviator Sunglasses', category: 'Accessories', price: 120.00, imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80', description: 'Gold frame aviator sunglasses.' },
  { id: 'p23', name: 'Silver Watch', category: 'Accessories', price: 250.00, imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80', description: 'Stainless steel analog watch.' },
  { id: 'p24', name: 'Baseball Cap', category: 'Accessories', price: 25.00, imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80', description: 'Classic navy baseball cap.' },
  { id: 'p25', name: 'Silk Scarf', category: 'Accessories', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=400&q=80', description: 'Patterned silk neck scarf.' },
  { id: 'p26', name: 'Leather Belt', category: 'Accessories', price: 40.00, imageUrl: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=400&q=80', description: 'Black leather belt with silver buckle.' },
  { id: 'p27', name: 'Backpack', category: 'Accessories', price: 65.00, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80', description: 'Grey laptop backpack.' },
  { id: 'p28', name: 'Beanie Hat', category: 'Accessories', price: 20.00, imageUrl: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=400&q=80', description: 'Warm knit beanie.' },
  { id: 'p29', name: 'Crossbody Bag', category: 'Accessories', price: 95.00, imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80', description: 'Small black crossbody bag.' },
  { id: 'p30', name: 'Gold Necklace', category: 'Accessories', price: 130.00, imageUrl: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=400&q=80', description: 'Minimalist gold chain necklace.' },

  // Home
  { id: 'p31', name: 'Modern Desk Lamp', category: 'Home', price: 55.00, imageUrl: 'https://images.unsplash.com/photo-1507473888900-52e1ad145986?auto=format&fit=crop&w=400&q=80', description: 'Adjustable LED desk lamp.' },
  { id: 'p32', name: 'Ceramic Vase', category: 'Home', price: 35.00, imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792ca11df53?auto=format&fit=crop&w=400&q=80', description: 'Handmade white ceramic vase.' },
  { id: 'p33', name: 'Throw Pillow', category: 'Home', price: 25.00, imageUrl: 'https://images.unsplash.com/photo-1579656381282-b56c5057bc93?auto=format&fit=crop&w=400&q=80', description: 'Decorative geometric throw pillow.' },
  // Fixed broken Wall Clock image
  { id: 'p34', name: 'Wall Clock', category: 'Home', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=400&q=80', description: 'Minimalist wooden wall clock.' },
  { id: 'p35', name: 'Succulent Pot', category: 'Home', price: 15.00, imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80', description: 'Small concrete planter.' },
  { id: 'p36', name: 'Coffee Mug Set', category: 'Home', price: 30.00, imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=400&q=80', description: 'Set of 4 ceramic coffee mugs.' },
  // Replaced Area Rug for better reliability
  { id: 'p37', name: 'Area Rug', category: 'Home', price: 120.00, imageUrl: 'https://images.unsplash.com/photo-1505409627970-63b5f83d3cbe?auto=format&fit=crop&w=400&q=80', description: 'Woven cotton area rug.' },
  // Replaced Table Fan for better reliability
  { id: 'p38', name: 'Table Fan', category: 'Home', price: 60.00, imageUrl: 'https://images.unsplash.com/photo-1618941716939-553df5c6c27e?auto=format&fit=crop&w=400&q=80', description: 'Retro style desk fan.' },
  { id: 'p39', name: 'Picture Frame', category: 'Home', price: 20.00, imageUrl: 'https://images.unsplash.com/photo-1534349762913-96c225508b48?auto=format&fit=crop&w=400&q=80', description: 'Black aluminum picture frame.' },
  { id: 'p40', name: 'Scented Candle', category: 'Home', price: 28.00, imageUrl: 'https://images.unsplash.com/photo-1602825389660-3f7f7baf89ad?auto=format&fit=crop&w=400&q=80', description: 'Lavender scented soy candle.' },

  // Electronics
  { id: 'p41', name: 'Wireless Headphones', category: 'Electronics', price: 199.00, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80', description: 'Noise-cancelling over-ear headphones.' },
  { id: 'p42', name: 'Smart Speaker', category: 'Electronics', price: 99.00, imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=400&q=80', description: 'Voice-controlled smart home speaker.' },
  { id: 'p43', name: 'Digital Camera', category: 'Electronics', price: 450.00, imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80', description: 'Compact mirrorless camera.' },
  { id: 'p44', name: 'Tablet Cover', category: 'Electronics', price: 30.00, imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80', description: 'Protective leather tablet case.' },
  { id: 'p45', name: 'Power Bank', category: 'Electronics', price: 40.00, imageUrl: 'https://images.unsplash.com/photo-1609592424303-36c1c1374f14?auto=format&fit=crop&w=400&q=80', description: 'High-capacity portable charger.' },
  { id: 'p46', name: 'Smart Watch', category: 'Electronics', price: 250.00, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80', description: 'Fitness tracking smart watch.' },
  { id: 'p47', name: 'Bluetooth Earbuds', category: 'Electronics', price: 129.00, imageUrl: 'https://images.unsplash.com/photo-1572569028738-411a561033f4?auto=format&fit=crop&w=400&q=80', description: 'True wireless in-ear headphones.' },
  { id: 'p48', name: 'Mouse', category: 'Electronics', price: 60.00, imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80', description: 'Ergonomic wireless mouse.' },
  { id: 'p49', name: 'Keyboard', category: 'Electronics', price: 110.00, imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b91a05c?auto=format&fit=crop&w=400&q=80', description: 'Mechanical gaming keyboard.' },
  { id: 'p50', name: 'Webcam', category: 'Electronics', price: 80.00, imageUrl: 'https://images.unsplash.com/photo-1598965675045-45c5e72077f8?auto=format&fit=crop&w=400&q=80', description: 'HD streaming webcam.' },
];
