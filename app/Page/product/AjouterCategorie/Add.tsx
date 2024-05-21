export function addCategories(id :any, title :any , image :any , Index :any){
    const shopDataString = localStorage.getItem("shop");
    const shopData = shopDataString ? JSON.parse(shopDataString) : {};


    let categories ={
        ...shopData[Index]?.card.categories
    }
    let NEwCategories  =  {
        id: id,
        color: "#FFFFFF",
        items: [],
        ranks: {
          default: 1,
          orderOverride: [
            {
              Order: 1,
              IdShop: 2,
            },
          ],
        },
        title: title,
        video: {
          url: "",
          type: "",
        },
        idCard: 1,
        archive: false,
        imageUrl: {
          Default: {
            urlDefault:image,
            salesSupport: [],
          },
          override: [
            {
              shopId: "",
            },
            {
              info: [],
              salesSupport: [],
            },
          ],
        },
        reference: "00085",
        linkedTags: [],
        description: {
          Default: {
            impression: [],
            nameDefault: "",
            salesSupport: [],
          },
        },
        displayName: {
          Default: {
            impression: [],
            nameDefault: "junior",
          },
        },
        linkedItems: [],
        categoryChild: [],
        categoryParent: "",
        visibilityInfo: {
          default: {
            Emporter: {
              id: "d99758ef-0049-4513-90fe-ca44bd069aac",
              visibility: true,
            },
            Livraison: {
              id: "3cb893e8-0f3a-4dcf-aab7-9545e97dfda7",
              visibility: true,
            },
            "Sur place": {
              id: "8185fa67-f472-4173-a9b8-ec3dc79cd697",
              visibility: true,
            },
            Restaurant: {
              id: "0f0e6661-8f11-4ed8-af32-55a53e45dfd2",
              visibility: true,
            },
          },
          isVisible: true,
          basicCompositionVisibility: true,
        },
        categoryLiaison: [],
        isNameDisplayed: false,
        linkedChildCategories: [],
        isInformationModeActivated: true,
      }
      categories[id]={...NEwCategories}

    shopData[Index] = {
        ...shopData[Index],
        card: {
            ...shopData[Index]?.card,
            categories:categories
        }
    };
    localStorage.setItem("shop", JSON.stringify(shopData));

    // Retrieve card data from local storage
    const shopCardString = localStorage.getItem("card");
    const shopCardData = shopCardString ? JSON.parse(shopCardString) : {};

    // Add the new category to the card data
    shopCardData.categories[id] = { ...NEwCategories };

    // Update local storage with the modified card data
    localStorage.setItem("card", JSON.stringify(shopCardData));

    return   NEwCategories
    
  
    

}