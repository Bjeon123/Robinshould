class CreateWatchlist < ActiveRecord::Migration[6.1]
  def change
    create_table :watchlists do |t|
      t.string :name, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :watchlists, :user_id
  end
end
