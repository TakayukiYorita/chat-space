FactoryBot.define do
  factory :message do
    content {Faker::Lolem.sentence}
    image {File.open("#{Rails.root}/public/images/test_image.jpeg")}
    user
    group
  end
end