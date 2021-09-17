class CreateHoldings < ActiveRecord::Migration[6.1]
  def change
    create_table :holdings do |t|
      t.integer :user_id, null: false
      t.integer :ticker, null: false
      t.float :bought_price, null: false
      t.float :shares_bought, null: false
      t.float :price_sold
      t.timestamps
    end
    add_index :holdings, :user_id
    add_index :holdings, :ticker
  end
end
