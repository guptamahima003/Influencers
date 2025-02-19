// This is a mock service for development
export async function fetchInstagramHashtagMedia() {
  // Simulated delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return [
    {
      id: '1',
      caption: 'MacBook Pro M3 Max Review - The FASTEST Mac Ever! #bestbuy #apple #tech',
      media_type: 'VIDEO',
      media_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      username: 'techreviewpro',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      caption: 'iPhone 15 Pro Max vs Samsung S24 Ultra Camera Test! #bestbuy #smartphones',
      media_type: 'VIDEO',
      media_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      username: 'gadgetmaster',
      profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
      timestamp: new Date().toISOString()
    },
    {
      id: '3',
      caption: 'Best Gaming Laptops of 2024 at Best Buy! RTX 4090 Beasts 🔥 #bestbuy #gaming #laptops',
      media_type: 'VIDEO',
      media_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      username: 'techgeekreviews',
      profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
      timestamp: new Date().toISOString()
    }
  ];
} 