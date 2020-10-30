class CreateAnimals < ActiveRecord::Migration[6.0]
  def change
    create_table :animals do |t|
      t.string :name
      t.string :imageUrl
      t.string :description
      t.integer :donations

      t.timestamps
    end
  end
end
