class HoldingRename < ActiveRecord::Migration[6.1]
  def change
    rename_column :holdings, :ticker, :ticker_id
    rename_column :holdings, :shares_bought, :shares
    rename_column :holdings, :bought_price, :avg_price
    remove_column :holdings, :price_sold
  end
end
