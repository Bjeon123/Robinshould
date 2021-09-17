class Stock < ApplicationRecord
    validates :company_name, presence: true
    validates :ticker, presence: true, uniqueness: true
    
end