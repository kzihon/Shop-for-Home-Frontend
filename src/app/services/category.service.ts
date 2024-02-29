import { Injectable } from '@angular/core';
import { Category } from '../model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    { name: "all products",
      img: "assets/images/allCategories.png",
    },
    { name: "tables",
      img: "assets/images/tables.png",
    },
    { name: "chairs",
      img: "assets/images/chairs.png",
    },
    { name: "lamps",
      img: "assets/images/lamps.png",
    },
    { name: "plants",
      img: "assets/images/plants.png",
    },
    { name: "artwork",
      img: "assets/images/art.png",
    },
    { name: "couchs",
      img: "assets/images/couches.png",
    },
    { name: "rugs",
    img: "assets/images/rugs.png",
  },
  ];

  getCategories() {
    return this.categories;
  }
}
