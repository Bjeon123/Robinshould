class AddIndexForHoldingUserAssociation < ActiveRecord::Migration[6.1]
  def change
    add_index :holdings, [:user_id,:ticker], unique: true
  end
end
