class CreateWatchlistJoin < ActiveRecord::Migration[6.1]
  def change
    create_table :watchlist_joins do |t|
      t.integer :watchlist_id, null: false
      t.integer :stock_id, null: false
      t.timestamps
    end
    add_index :watchlist_joins, [:watchlist_id,:stock_id]
    add_index :watchlist_joins, [:watchlist_id]
    add_index :watchlist_joins, [:stock_id]
  end
end
