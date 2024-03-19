
Feature: Navigate to the Shop Page & Count Offers in the "Offers you won't want to miss" List carousel


        Scenario: Click Shop Link and check that the number of offers is greater than 6

        Given I open the "https://www.cashrewards.com.au/"  URL
        When I click the "user-menu" tag "Shop" link
        Then I should be redirected to the "Online cashback offers & deals 2024 | Cashrewards" page
        And I should see greater than 6 offers in the "Offers you won't want to miss" list carousel