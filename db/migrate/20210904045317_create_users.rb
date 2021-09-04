class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :first_name, null: false
      t.string :name_name, null: false
      t.string :address, null: false
      t.float :total_capital, null: false

      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
