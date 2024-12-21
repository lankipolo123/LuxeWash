import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { FavoriteService } from '../../../services/favorite.service';
import { ToastController } from '@ionic/angular';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  rating?: number; // Added rating property
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  product: Product | null = null;
  quantity: number = 1; // Added quantity property with default value

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private favoriteService: FavoriteService,
    private toastController: ToastController // Inject ToastController
  ) {}

  ngOnInit() {
    const productId = +this.route.snapshot.params['id'];
    const productsData = [
      { 
        id: 1, 
        name: "ZOTE Pink Bar Soap", 
        description: "ZOTE Pink Bar Soap (14.1 oz) is a powerful and effective laundry soap made with natural ingredients that provide a deep clean. Known for its brightening properties, this versatile soap is perfect for hand washing and machine use", 
        price: 59.99, 
        image: "assets/images/zote.png", 
        category: "Bar Soap", 
        rating: 4.5 
      },
      
      { 
        id: 2, 
        name: "Htovila", 
        description: "Htovila is a safe, non-toxic soap that effectively removes dirt and grime while infusing your laundry with a pleasant floral fragrance. Perfect for sensitive skin, this gentle soap ensures a thorough clean without harsh chemicals", 
        price: 79.99, 
        image: "assets/images/htovilla.png", 
        category: "Bar Soap", 
        rating: 4.2 
      },
      
      { 
        id: 3, 
        name: "Vanish Stain", 
        description: "Vanish StainBar employs Power Enzymes to effectively tackle tough stains without using bleach. Its advanced formula penetrates deep into fabrics, lifting away stubborn marks while preserving the color and quality of your clothes", 
        price: 99.99, 
        image: "assets/images/vanishstain.png", 
        category: "Bar Soap", 
        rating: 4.8 
      },
      
      { 
        id: 4, 
        name: "RAJ", 
        description: "Raj Super White is a premium natural laundry soap that is effective on stains while being gentle on fabrics. This soap not only cleans effectively but also helps maintain the brightness of whites.", 
        price: 87.99, 
        image: "assets/images/RAJ.png", 
        category: "Bar Soap", 
        rating: 4.6 
      },
      
      { 
        id: 5, 
        name: "Tide", 
        description: "TIDE DETERGENT BAR NATURE FRESH comes in a set of six 125-gram bars with biodegradable ingredients, ensuring effective cleaning while being environmentally friendly. Designed for all types of fabrics", 
        price: 100.99, 
        image: "assets/images/Tide.png", 
        category: "Bar Soap", 
        rating: 4.7 
      },
      
      { 
        id: 6, 
        name: "Tide LD", 
        description: "Ultra concentrated Tide Liquid (150 Fl. Oz.) delivers an impressive 110 loads with its HE Turbo Clean technology. This powerful detergent effectively removes tough stains and dirt, leaving your clothes looking vibrant", 
        price: 159.99, 
        image: "assets/images/tideLiquid.png", 
        category: "Liquid", 
        rating: 4.9 
      },
      
      { 
        id: 7, 
        name: "XTRA", 
        description: "XTRA Tropical Passion Liquid Laundry Detergent is phosphate-free and compatible with all machines, including HE. It offers long-lasting freshness for up to 210 loads, effectively removing dirt and stains.", 
        price: 139.99, 
        image: "assets/images/Xtra.png", 
        category: "Liquid", 
        rating: 4.4 
      },
      
      { 
        id: 8, 
        name: "Oxi clean", 
        description: "Oxi Clean is a powerful stain remover that effectively tackles tough stains and odors on laundry and household surfaces. Its unique oxygen-based formula penetrates deep into fabrics, lifting stubborn stains", 
        price: 169.99, 
        image: "assets/images/oxiClean.png", 
        category: "Liquid", 
        rating: 4.3 
      },
      
      { 
        id: 9, 
        name: "Ariel", 
        description: "Ariel Liquid Sunrise Fresh Refill (730g) is designed to deliver superior stain removal with the invigorating scent of Sunrise Fresh. Its concentrated formula effectively tackles tough stains.", 
        price: 149.99, 
        image: "assets/images/ariel.png", 
        category: "Liquid", 
        rating: 4.7 
      },
      
      { 
        id: 10, 
        name: "Purex LD", 
        description: "Purex Odor Release (128 oz) offers powerful cleaning with advanced odor elimination technology. This detergent ensures long-lasting freshness for up to 30 days, effectively removing dirt and stains.", 
        price: 129.99, 
        image: "assets/images/purex.png", 
        category: "Liquid", 
        rating: 4.5 
      },
      
      { 
        id: 11, 
        name: "Surf Fresh", 
        description: "Surf Powder Blossom Fresh (550g) infuses freshness into every fiber of your clothes with its delightful floral fragrance. This powder detergent effectively cleans and brightens your laundry.", 
        price: 129.99, 
        image: "assets/images/surf.png", 
        category: "Powder", 
        rating: 4.6 
      },
      
      { 
        id: 12, 
        name: "Gain PD", 
        description: "Gain Powder Laundry Detergent (91 oz) delivers brilliant cleaning performance with a refreshing Original scent that lasts. This detergent effectively removes tough stains while leaving your clothes feeling fresh and smelling great.", 
        price: 119.99, 
        image: "assets/images/Gain.png", 
        category: "Powder", 
        rating: 4.8 
      },
      
      { 
        id: 13, 
        name: "Purex PD", 
        description: "Purex Powder Detergent (50 oz) combines effective stain-fighting power with the fresh aroma of an alpine breeze. This detergent is designed to clean and brighten your laundry, ensuring your clothes look and smell their best.", 
        price: 139.99, 
        image: "assets/images/purexPowder.png", 
        category: "Powder", 
        rating: 4.5 
      },
      
      { 
        id: 14, 
        name: "Sun PD", 
        description: "Clean & Fresh Laundry Detergent (125 oz) provides a relaxing scent of white florals, apples, and citrus, making laundry a more enjoyable task. This powerful detergent effectively cleans and brightens fabrics", 
        price: 149.99, 
        image: "assets/images/Sun.png", 
        category: "Powder", 
        rating: 4.4 
      },
      
      { 
        id: 15, 
        name: "Super White", 
        description: "Super White washing powder features a unique formula that effectively removes bacteria, odors, and stubborn stains from your laundry. This detergent not only cleans deeply but also helps maintain the brightness of your whites", 
        price: 159.99, 
        image: "assets/images/superWhite.png", 
        category: "Powder", 
        rating: 4.7 
      },
      
      { 
        id: 16, 
        name: "Comfort", 
        description: "Comfort After Wash Morning Fresh Fabric Conditioner provides long-lasting fragrance while protecting fabric fibers from wear and tear.", 
        price: 129.99, 
        image: "assets/images/Comfort.png", 
        category: "Fab Con", 
        rating: 4.6 
      },
      
      { 
        id: 17, 
        name: "Lenor", 
        description: "Lenor Fabric Conditioner Spring Awakening delivers long-lasting freshness with 24-hour odor defense. Its unique formula softens fabrics while providing a protective layer that helps prevent wear and tear", 
        price: 139.99, 
        image: "assets/images/Lenor.png", 
        category: "Fab Con", 
        rating: 4.9 
      },
      
      { 
        id: 18, 
        name: "Downy", 
        description: "Downy Rinse & Refresh Ocean Mist is specially formulated to help rinse away stubborn odors trapped within fabric fibers. This fabric conditioner not only softens your laundry but also revitalizes its freshness.", 
        price: 149.99, 
        image: "assets/images/downy.png", 
        category: "Fab Con", 
        rating: 4.7 
      },
      
      { 
        id: 19, 
        name: "Plantex", 
        description: "Plantex Green Fabric Conditioner is a gentle yet effective formula designed to soften clothing while being perfect for sensitive skin. This conditioner leaves your laundry smelling fresh and feeling soft without any harsh chemicals.", 
        price: 159.99, 
        image: "assets/images/plantex.png", 
        category: "Fab Con", 
     
        rating: 4.4 
      },
      
      { 
        id: 20, 
        name: "Tiny Buds", 
        description: "Lovingly made with plant-based softeners that leave baby’s clothes, sheets and laundry Soft and Fluffy to the touch.Soft & Fluffy to the Touch – Mild & Calming Fragrance. Your purchase will help #PlantTinyBuds in partnership with WWF-Philippines", 
        price: 169.99, 
        image: "assets/images/TinyBuds.png", 
        category: "Fab Con", 
        rating: 4.5
      },
      { id: 21, name: "Black Hangers", description: "Elevate your laundry game with our Plastic Black Hanger. Crafted from durable, lightweight plastic, this sleek black hanger is perfect for keeping your clothes organized and wrinkle-free.",
        price: 32.99, image: "assets/images/blackHanger.png", category: "Extra", rating: 4.2 },
      { id: 22, name: "Pratap Cloth Clips", description: "Pratap Extra Large 24 Pc Cloth Clips will help to keep your wet clothes in place once they are dry. The cloth clips are made of plastic and are durable for prolonged usage.",
        price: 50.99, image: "assets/images/clothClips.png", category: "Extra",   rating: 4.3 },
      { id: 23, name: "Fishnet Clothes Brush", description: "The Multipurpose Laundry Fishnet Brush is a high-quality scrub brush designed for various cleaning tasks. Ideal for home use in the bathroom or laundry room, it effectively cleans clothes, shoes, and trousers",
        price: 39.99, image: "assets/images/clothScrubber.png", category: "Extra", rating: 4.5 },
      { id: 24, name: "Pegs hangers", description: "With a compact design for easy storage, this sage green coloured peg hanger has been crafted from durable and strong plastic and features a sturdy hanging hook for easy storing and comes complete with 20 pegs.",
        price: 25.99, image: "assets/images/pegsHanger.png", category: "Extra",  rating: 4.6 },
      { id: 25, name: "Wash Basin", description: "This versatile pan is perfect for cleaning floors, hand washing delicate clothes, and more. Use it as a dish or laundry pan, cleaning pail, or for outdoor tasks like weeding your garden",
        price: 229.99, image: "assets/images/washBasin.png", category: "Extra",  rating: 4.7 }
  ];
    this.product = productsData.find(product => product.id === productId) || null;
  }
  

  async addToCart() {
    if (this.product) {
      this.cartService.addToCart({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.quantity, // Use the quantity set by the user
        imageUrl: this.product.image
      });
      console.log(`${this.product.name} added to cart`);
      await this.showToast(`${this.product.name} added to cart!`); // Show toast notification
    }
  }

  async buyNow() {
    if (this.product) {
      this.cartService.addToCart({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.quantity, // Use the quantity set by the user
        imageUrl: this.product.image
      });
      console.log(`${this.product.name} added to cart`);
      await this.showToast(`${this.product.name} added to cart!`); // Show toast notification
      this.router.navigate(['tabs/cart']);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success', // Custom class for styling
    });
    await toast.present();
  }

  async addToFavorites() {
    if (this.product) {
      // Add product to favorites
      this.favoriteService.addToFavorites(this.product);
      console.log(`${this.product.name} added to favorites`);

      // Show toast notification
      const toast = await this.toastController.create({
        message: `${this.product.name} added to Favorites`,
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      toast.present();
    }
  }

  // New methods to increase and decrease quantity
  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  goBack() {
    this.router.navigate(['tabs/']);
  }
}
