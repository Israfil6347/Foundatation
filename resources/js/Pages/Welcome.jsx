import { Head, router, useRemember } from "@inertiajs/react";
import PublicTemplateLayout from "@/Layouts/PublicTemplateLayout";
import { useEffect, useState } from "react";
export default function Welcome({ auth}) {
  const [donateSectionVisibility, setDonateSectionVisibility] = useState(false);
  const [pageData,setPageData]= useRemember()
  const [donateData,setDonateData]= useRemember()

  
  useEffect(()=>{
      axios
      .get(route('pages.getPostBySlug','home'))
      .then((response) => {
        
        setPageData(response.data.data)
      })
      .catch((error) => {
       
      })
      .finally(() => {
      
      });      
  },[donateData])

const openDonateAccount =()=>{
  axios
      .get(route('adminDonate.allAccountInfo'))
      .then((response) => {
        
        setDonateData(response.data.data)
      })
      .catch((error) => {
      
      })
      .finally(() => {
      });
}

  return (
    <>
    
      <Head title="Fr. Charles J. Young Foundation" />
      <PublicTemplateLayout auth={auth}>
        <div className="flex flex-col gap-10">
          <div className="container mx-auto">
            <div className="border border-dashed border-secondary bg-surface text-onSurface">
              <div className="px-4 py-10 md:px-6 lg:py-20 lg:px-10">
                <div className="container mx-auto">
                  <div className="mb-20 text-center">
                    <div className="font-semibold uppercase">About Us</div>
                    <div className="text-3xl font-extrabold">
                      {pageData?.subtitle}
                    </div>
                  </div>
                  <section className="space-y-6">
                    <div
                      className="max-w-full prose text-justify leading-loose"
                      dangerouslySetInnerHTML={{
                          __html: pageData?.body ?? '',
                      }}
                    >
                   </div>
                  </section>

                  <div className="flex items-center justify-center mt-4 mb-6">
                    <div
                      className="px-5 py-3 text-white border border-gray-600 rounded-md bg-primary hover:cursor-pointer hover:bg-primaryVariant"
                      onClick={() => {
                        setDonateSectionVisibility(!donateSectionVisibility);
                        openDonateAccount()
                      }}
                    >
                      Donate Now
                    </div>
                  </div>
                  <section
                    className={`flex ${
                                          donateSectionVisibility
                                            ? "translate-x-0"
                                            : "translate-x-[-9999px]"
                                        }
                                        flex-col items-center justify-center gap-4 transition-all md:flex-row`}
                  >
                  {Array.isArray(donateData) && donateData.map((data, index) => (


               
                   
                        <div key={index}  className="flex items-center justify-center h-40 p-6 border rounded border-secondary">
                      <div className="">
                        <div className="">
                          <strong>Accounts Name: </strong> {data.accounts_name}
                        </div>
                        <div className="">
                          <strong>Number: </strong> {data.account_number}
                          {/* 00736000877 */}
                        </div>
                        <div className="">
                          <strong>Bank Name: </strong> {data.company_name}
                          {/* Bank Asia Ltd. */}
                        </div>
                        <div className="">
                          <strong>Branch: </strong>
                          {data.branch_name}
                           {/* Scotia Branch (070276130) */}
                        </div>
                      </div>
                    </div>
                 
                      
                    ))}
                    

                    {/* <p className="text-center">OR</p> */}

                    {/* <div className="flex items-center justify-center h-40 p-6 border rounded border-secondary">
                      <div className="">
                        <div className="font-extrabold">
                          “Dhaka Credit Savings Account”
                        </div>
                        <div className="">
                          <strong>Accounts Name: </strong> Fr. Charles J. Young
                          Foundation
                        </div>
                        <div className="">
                          <strong>Number: </strong> T-0065428
                        </div>
                      </div>
                    </div> */}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PublicTemplateLayout>
    </>
  );
}
