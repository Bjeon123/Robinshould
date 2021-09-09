class CreateStocks < ActiveRecord::Migration[6.1]
  def change
    create_table :stocks do |t|
      t.string :ticker, null: false
      t.string :company_name, null: false
      t.timestamps
    end
    add_index :stocks, :ticker
  end
end
