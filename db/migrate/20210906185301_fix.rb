class Fix < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :name_name
    add_column :users, :last_name, :string, null: false
  end
end
