<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductPhotos;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Seed demo menu data for local development.
     */
    public function run(): void
    {
        $menus = [
            'Bakso' => [
                ['name' => 'Bakso Urat', 'price' => 18000],
                ['name' => 'Bakso Halus', 'price' => 15000],
                ['name' => 'Bakso Telur', 'price' => 20000],
                ['name' => 'Bakso Campur', 'price' => 22000],
            ],
            'Mie' => [
                ['name' => 'Mie Ayam Bakso', 'price' => 18000],
                ['name' => 'Mie Ayam Pangsit', 'price' => 16000],
            ],
            'Minuman' => [
                ['name' => 'Es Teh', 'price' => 5000],
                ['name' => 'Es Jeruk', 'price' => 7000],
                ['name' => 'Air Mineral', 'price' => 4000],
            ],
        ];

        foreach ($menus as $categoryName => $products) {
            $category = Category::firstOrCreate(['name' => $categoryName]);

            foreach ($products as $menu) {
                $product = Product::firstOrCreate(
                    ['name' => $menu['name']],
                    [
                        'category_id' => $category->id,
                        'price' => $menu['price'],
                    ],
                );

                ProductPhotos::firstOrCreate(
                    [
                        'product_id' => $product->id,
                        'is_primary' => true,
                    ],
                    ['url' => '/logo.svg'],
                );
            }
        }
    }
}
