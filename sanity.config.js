'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'
import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  // 'placeholder' keeps the config valid before a real project id is set
  projectId: projectId || 'placeholder',
  dataset,
  schema,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
})
