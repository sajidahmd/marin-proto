import React from "react";
import ContentSection from "@/components/dashboard/settings/ContentSection";
import ProfileForm from "@/components/dashboard/settings/ProfileForm";

const ProfilePage: React.FC = () => {
  return (
    <ContentSection
      title='Profile'
      desc='This is how others will see you on the site.'
    >
      <ProfileForm/>
    </ContentSection>
  )
}


export default ProfilePage;