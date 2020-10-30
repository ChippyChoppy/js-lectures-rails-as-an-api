# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "🗑Deleting animals..."

Animal.destroy_all

puts "🐒Creating animals..."

animals = [
  {
    name: "Red Panda",
    imageUrl: "https://i1.wp.com/www.redpandanetwork.org/wp-content/uploads/2018/10/Photo-1-for-Give-page.png?fit=584%2C584&ssl=1",
    description: "not actually a panda",
    donations: 60
  },
  {
    name: "Pangolin",
    imageUrl: "https://i.pinimg.com/originals/bf/ff/93/bfff9395c6ae0d24534f030580924c7e.jpg",
    description: "The Pangolin, otherwise known as the scaly anteater, is the only mammal in the world to be covered from head to toe in keratin scales (the same as human finger nails).",
    donations: 10
  },
  {
    name: "Mantis Shrimp",
    imageUrl: "https://media.wired.com/photos/5bc7d05bf867c63ebba1b104/1:1/w_1800,h_1800,c_limit/mantisshrimp-467993194.jpg",
    description: "The mantis shrimp can punch with the speed of a .22 caliber bullet—strong enough to break the shells of its prey, as well as aquarium glass.",
    donations: 0
  },
  {
    name: "Gibbon",
    imageUrl: "https://external-preview.redd.it/hqv76hMTwDpeM4o4jp55PIUuBCwTq5T66zy_0MJiVv8.jpg?auto=webp&s=36c0ae0727537b4a01c42cc32d37770f5b25e3e9",
    description: "Gibbons communicate by singing! Gibbon vocalizations are often referred to as song because of the way they modulate their pitch. Gibbons sing alone and in duets and they start each day by singing at sunrise.",
    donations: 0
  },
  {
    name: "tiger",
    imageUrl: "https://www.funkidslive.com/wp-content/uploads/2014/07/tiger-baby-1024x640.jpg",
    description: "tiger kittens are cute!",
    donations: 30
  }
]

animals.each do |animal_hash|
  Animal.create!(animal_hash)
end

puts "✅Done!"