import rawData from '@/data/portfolioData.json';

// Strip citation annotations like [cite: 14]
export function clean(text: string): string {
  return text.replace(/\s*\[cite:\s*\d+\]/g, '').trim();
}

export const portfolioData = {
  personal: {
    name: clean(rawData.personal_info.name),
    headline: 'Third-Year International Economics Student | Business Analyst Enthusiast',
    careerOrientations: rawData.personal_info.career_orientations.map(clean),
    characteristics: rawData.personal_info.characteristics.map(clean),
    introduction: clean(rawData.personal_info.introduction),
    email: clean(rawData.personal_info.contact.email),
  },
  education: {
    university: clean(rawData.education.university),
    major: clean(rawData.education.major),
    currentYear: clean(rawData.education.current_year),
    gpa: clean(rawData.education.gpa),
    certifications: rawData.education.certifications.map(clean),
    achievements: rawData.education.achievements.map(clean),
  },
  experience: rawData.experience_and_activities.map((exp) => ({
    role: clean(exp.role),
    organization: 'organization' in exp ? clean(exp.organization as string) : undefined,
    field: 'field' in exp ? clean(exp.field as string) : undefined,
    responsibilities: exp.responsibilities.map(clean),
    skillsDemonstrated: exp.skills_demonstrated.map(clean),
    results: 'results' in exp ? clean(exp.results as string) : undefined,
  })),
  skills: {
    business: rawData.skills.business.map(clean),
    tools: rawData.skills.tools.map(clean),
    languages: rawData.skills.languages.map(clean),
    professional: rawData.skills.professional.map(clean),
  },
};

export type PortfolioData = typeof portfolioData;
