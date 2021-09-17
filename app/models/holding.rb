class Holding < ApplicationRecord
    validates :user_id, :ticker_id, :shares, :avg_price, presence: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :stock,
        foreign_key: :ticker_id,
        class_name: :Stock
    
end