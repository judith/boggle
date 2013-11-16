class CreateDictionaries < ActiveRecord::Migration
  def change
    create_table :dictionaries, :id => false do |t|
      t.string :word
    end
  end
end
