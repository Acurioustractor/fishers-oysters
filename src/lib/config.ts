/**
 * Project Configuration Loader
 *
 * Loads and types the project configuration.
 */

import configData from '../../project.config.json';

export interface ProjectConfig {
  projectCode: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  theme: string;
  content: {
    hero: {
      heading: string;
      subheading: string;
      cta: { label: string; href: string };
    };
    about: {
      intro: string;
      mission: string;
      values: Array<{ title: string; description: string }>;
    };
    stats: Array<{ value: string; label: string }>;
    offerings: Array<{
      title: string;
      description: string;
      href: string;
      icon: string;
    }>;
    quote: {
      text: string;
      attribution: string;
    };
    cta: {
      heading: string;
      text: string;
      button: { label: string; href: string };
    };
    stories: {
      heading: string;
      subheading: string;
    };
  };
  ecosystem: {
    enabled: boolean;
    name: string;
    url: string;
  };
  integrations: {
    empathyLedger: {
      enabled: boolean;
      projectSlug: string;
    };
    ghl: {
      enabled: boolean;
      locationId: string;
    };
    notion: {
      enabled: boolean;
      pageId: string;
    };
  };
  navigation: Array<{
    label: string;
    href: string;
  }>;
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  contact: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

export const config: ProjectConfig = configData as ProjectConfig;

export function getNavigation() {
  return config.navigation;
}

export function getSocialLinks() {
  return Object.entries(config.social)
    .filter(([_, value]) => value)
    .map(([platform, url]) => ({
      platform,
      url: url as string,
    }));
}

export function isIntegrationEnabled(integration: 'empathyLedger' | 'ghl' | 'notion'): boolean {
  return config.integrations[integration]?.enabled ?? false;
}
