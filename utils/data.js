import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'John',
      email: 'admin@maji.com',
      password: bcrypt.hashSync('12345678'),
      isAdmin: true,
      isVendor: true,
    },
    {
      name: 'Jane',
      email: 'customer@maji.com',
      password: bcrypt.hashSync('12345678'),
      isAdmin: false,
      isVendor: false,
    },
    {
      name: 'Marlon',
      email: 'vendor@maji.com',
      password: bcrypt.hashSync('12345678'),
      isAdmin: false,
      isVendor: true,
    },
  ],

  products: [
    {
      name: 'Bowser General Purpose Water',
      slug: 'bowser-water-1000l',
      category: 'Soft-Water',
      brandLogo: '/images/logo1.png',
      capacity: '1000 litres',
      image: '/images/truck.png',
      price: 650,
      brand: 'Maji Maji',
      rating: 5,
      numReviews: 10,
      countInStock: 20,
      description:
        'This is high quality general purpose water. Collected from the highlands and rich with minerals.',
    },
    {
      name: 'Bowser General Purpose Water',
      slug: 'bowser-water-5000l',
      category: 'Soft-Water',
      brandLogo: '/images/logo1.png',
      capacity: '5000 litres',
      image: '/images/truck.png',
      price: 1200,
      brand: 'Maji Maji',
      rating: 5,
      numReviews: 10,
      countInStock: 20,
      description:
        'This is high quality general purpose water. Collected from the highlands and rich with minerals.',
    },
    {
      name: 'Bowser General Purpose Water',
      slug: 'bowser-water-10000l',
      category: 'Soft-Water',
      brandLogo: '/images/logo1.png',
      capacity: '10000 litres',
      image: '/images/truck.png',
      price: 2100,
      brand: 'Maji Maji',
      rating: 5,
      numReviews: 10,
      countInStock: 20,
      description:
        'This is high quality general purpose water. Collected from the highlands and rich with minerals.',
    },
  ],
};

export default data;
