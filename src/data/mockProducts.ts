export const mockProduct = {
  id: '1',
  title: 'iPad mini (A17 Pro chip - Built for Apple Apple Intelligence)',
  price: 279.99,
  originalPrice: 299.99,
  rating: 4.6,
  reviewCount: 483,
  images: [
    'https://picsum.photos/id/1/400/400',  // Using placeholder images for now
    'https://picsum.photos/id/2/400/400',
    'https://picsum.photos/id/3/400/400'
  ],
  quantity: 1,
  pickupDate: 'Mar 3',
  options: [
    {
      type: 'color' as const,
      name: 'Color',
      values: [
        {
          id: 'space-gray',
          label: 'Space Gray',
          available: true,
          image: 'https://picsum.photos/id/4/100/100'
        },
        {
          id: 'silver',
          label: 'Silver',
          available: true,
          image: 'https://picsum.photos/id/5/100/100'
        },
        {
          id: 'rose',
          label: 'Rose',
          available: false,
          image: 'https://picsum.photos/id/6/100/100'
        }
      ]
    },
    {
      type: 'storage' as const,
      name: 'Storage',
      values: [
        {
          id: '128gb',
          label: '128GB',
          available: true
        },
        {
          id: '256gb',
          label: '256GB',
          available: true
        },
        {
          id: '512gb',
          label: '512GB',
          available: false
        }
      ]
    }
  ]
}; 