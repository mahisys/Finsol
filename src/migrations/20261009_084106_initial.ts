import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_buttons_order_idx\` ON \`pages_blocks_hero_buttons\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_buttons_parent_id_idx\` ON \`pages_blocks_hero_buttons\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_trust_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_trust_points_order_idx\` ON \`pages_blocks_hero_trust_points\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_trust_points_parent_id_idx\` ON \`pages_blocks_hero_trust_points\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`side\` text DEFAULT 'form',
  	\`image_id\` integer,
  	\`form_heading\` text DEFAULT 'Check your loan eligibility',
  	\`background\` text DEFAULT 'brand',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_hero_image_idx\` ON \`pages_blocks_hero\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'full',
  	\`rich_text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_columns_order_idx\` ON \`pages_blocks_content_columns\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_columns_parent_id_idx\` ON \`pages_blocks_content_columns\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`background\` text DEFAULT 'white',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_order_idx\` ON \`pages_blocks_content\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_parent_id_idx\` ON \`pages_blocks_content\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_path_idx\` ON \`pages_blocks_content\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_media_content_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_media_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_media_content_buttons_order_idx\` ON \`pages_blocks_media_content_buttons\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_media_content_buttons_parent_id_idx\` ON \`pages_blocks_media_content_buttons\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_media_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`rich_text\` text,
  	\`image_id\` integer,
  	\`image_position\` text DEFAULT 'right',
  	\`background\` text DEFAULT 'white',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_media_content_order_idx\` ON \`pages_blocks_media_content\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_media_content_parent_id_idx\` ON \`pages_blocks_media_content\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_media_content_path_idx\` ON \`pages_blocks_media_content\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_media_content_image_idx\` ON \`pages_blocks_media_content\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_loan_products\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`show\` text DEFAULT 'all',
  	\`background\` text DEFAULT 'white',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_loan_products_order_idx\` ON \`pages_blocks_loan_products\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_loan_products_parent_id_idx\` ON \`pages_blocks_loan_products\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_loan_products_path_idx\` ON \`pages_blocks_loan_products\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_partner_banks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`background\` text DEFAULT 'white',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_partner_banks_order_idx\` ON \`pages_blocks_partner_banks\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_partner_banks_parent_id_idx\` ON \`pages_blocks_partner_banks\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_partner_banks_path_idx\` ON \`pages_blocks_partner_banks\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_stats_items_order_idx\` ON \`pages_blocks_stats_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_stats_items_parent_id_idx\` ON \`pages_blocks_stats_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`background\` text DEFAULT 'dark',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_stats_order_idx\` ON \`pages_blocks_stats\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_stats_parent_id_idx\` ON \`pages_blocks_stats\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_stats_path_idx\` ON \`pages_blocks_stats\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_features_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_features_items_order_idx\` ON \`pages_blocks_features_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_features_items_parent_id_idx\` ON \`pages_blocks_features_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`columns\` text DEFAULT '3',
  	\`background\` text DEFAULT 'white',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_features_order_idx\` ON \`pages_blocks_features\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_features_parent_id_idx\` ON \`pages_blocks_features\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_features_path_idx\` ON \`pages_blocks_features\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_steps_steps_order_idx\` ON \`pages_blocks_steps_steps\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_steps_steps_parent_id_idx\` ON \`pages_blocks_steps_steps\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`background\` text DEFAULT 'white',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_steps_order_idx\` ON \`pages_blocks_steps\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_steps_parent_id_idx\` ON \`pages_blocks_steps\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_steps_path_idx\` ON \`pages_blocks_steps\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`background\` text DEFAULT 'white',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_testimonials_order_idx\` ON \`pages_blocks_testimonials\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_testimonials_parent_id_idx\` ON \`pages_blocks_testimonials\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_testimonials_path_idx\` ON \`pages_blocks_testimonials\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`category\` text,
  	\`background\` text DEFAULT 'white',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_faq_order_idx\` ON \`pages_blocks_faq\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_faq_parent_id_idx\` ON \`pages_blocks_faq\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_path_idx\` ON \`pages_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'primary',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_cta_buttons_order_idx\` ON \`pages_blocks_cta_buttons\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_cta_buttons_parent_id_idx\` ON \`pages_blocks_cta_buttons\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`text\` text,
  	\`background\` text DEFAULT 'brand',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_cta_order_idx\` ON \`pages_blocks_cta\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_cta_parent_id_idx\` ON \`pages_blocks_cta\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_path_idx\` ON \`pages_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_lead_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`default_product_id\` integer,
  	\`submit_label\` text DEFAULT 'Get a call back',
  	\`success_message\` text DEFAULT 'Thank you! Our loan expert will call you shortly.',
  	\`anchor_id\` text DEFAULT 'apply',
  	\`background\` text DEFAULT 'light',
  	\`block_name\` text,
  	FOREIGN KEY (\`default_product_id\`) REFERENCES \`loan_products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_lead_form_order_idx\` ON \`pages_blocks_lead_form\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_lead_form_parent_id_idx\` ON \`pages_blocks_lead_form\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_lead_form_path_idx\` ON \`pages_blocks_lead_form\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_lead_form_default_product_idx\` ON \`pages_blocks_lead_form\` (\`default_product_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_emi_calculator\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`default_amount\` numeric DEFAULT 500000,
  	\`default_rate\` numeric DEFAULT 10.5,
  	\`default_tenure\` numeric DEFAULT 5,
  	\`max_amount\` numeric DEFAULT 10000000,
  	\`max_tenure\` numeric DEFAULT 30,
  	\`background\` text DEFAULT 'white',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_emi_calculator_order_idx\` ON \`pages_blocks_emi_calculator\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_emi_calculator_parent_id_idx\` ON \`pages_blocks_emi_calculator\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_emi_calculator_path_idx\` ON \`pages_blocks_emi_calculator\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`loan_products_id\` integer,
  	\`posts_id\` integer,
  	\`banks_id\` integer,
  	\`testimonials_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`loan_products_id\`) REFERENCES \`loan_products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`banks_id\`) REFERENCES \`banks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`);`)
  await db.run(
    sql`CREATE INDEX \`pages_rels_loan_products_id_idx\` ON \`pages_rels\` (\`loan_products_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`pages_rels_posts_id_idx\` ON \`pages_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_banks_id_idx\` ON \`pages_rels\` (\`banks_id\`);`)
  await db.run(
    sql`CREATE INDEX \`pages_rels_testimonials_id_idx\` ON \`pages_rels\` (\`testimonials_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`pages_rels_faqs_id_idx\` ON \`pages_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'primary',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_buttons_order_idx\` ON \`_pages_v_blocks_hero_buttons\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_buttons_parent_id_idx\` ON \`_pages_v_blocks_hero_buttons\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_trust_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_trust_points_order_idx\` ON \`_pages_v_blocks_hero_trust_points\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_trust_points_parent_id_idx\` ON \`_pages_v_blocks_hero_trust_points\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`side\` text DEFAULT 'form',
  	\`image_id\` integer,
  	\`form_heading\` text DEFAULT 'Check your loan eligibility',
  	\`background\` text DEFAULT 'brand',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_order_idx\` ON \`_pages_v_blocks_hero\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_parent_id_idx\` ON \`_pages_v_blocks_hero\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_path_idx\` ON \`_pages_v_blocks_hero\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_hero_image_idx\` ON \`_pages_v_blocks_hero\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'full',
  	\`rich_text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_columns_order_idx\` ON \`_pages_v_blocks_content_columns\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_columns_parent_id_idx\` ON \`_pages_v_blocks_content_columns\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`background\` text DEFAULT 'white',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_order_idx\` ON \`_pages_v_blocks_content\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_parent_id_idx\` ON \`_pages_v_blocks_content\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_path_idx\` ON \`_pages_v_blocks_content\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_media_content_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'primary',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_media_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_media_content_buttons_order_idx\` ON \`_pages_v_blocks_media_content_buttons\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_media_content_buttons_parent_id_idx\` ON \`_pages_v_blocks_media_content_buttons\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_media_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`rich_text\` text,
  	\`image_id\` integer,
  	\`image_position\` text DEFAULT 'right',
  	\`background\` text DEFAULT 'white',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_media_content_order_idx\` ON \`_pages_v_blocks_media_content\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_media_content_parent_id_idx\` ON \`_pages_v_blocks_media_content\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_media_content_path_idx\` ON \`_pages_v_blocks_media_content\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_media_content_image_idx\` ON \`_pages_v_blocks_media_content\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_loan_products\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`show\` text DEFAULT 'all',
  	\`background\` text DEFAULT 'white',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_loan_products_order_idx\` ON \`_pages_v_blocks_loan_products\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_loan_products_parent_id_idx\` ON \`_pages_v_blocks_loan_products\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_loan_products_path_idx\` ON \`_pages_v_blocks_loan_products\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_partner_banks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`background\` text DEFAULT 'white',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_partner_banks_order_idx\` ON \`_pages_v_blocks_partner_banks\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_partner_banks_parent_id_idx\` ON \`_pages_v_blocks_partner_banks\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_partner_banks_path_idx\` ON \`_pages_v_blocks_partner_banks\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_stats_items_order_idx\` ON \`_pages_v_blocks_stats_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_stats_items_parent_id_idx\` ON \`_pages_v_blocks_stats_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`background\` text DEFAULT 'dark',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_stats_order_idx\` ON \`_pages_v_blocks_stats\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_stats_parent_id_idx\` ON \`_pages_v_blocks_stats\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_stats_path_idx\` ON \`_pages_v_blocks_stats\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_features_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_features_items_order_idx\` ON \`_pages_v_blocks_features_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_features_items_parent_id_idx\` ON \`_pages_v_blocks_features_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`columns\` text DEFAULT '3',
  	\`background\` text DEFAULT 'white',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_features_order_idx\` ON \`_pages_v_blocks_features\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_features_parent_id_idx\` ON \`_pages_v_blocks_features\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_features_path_idx\` ON \`_pages_v_blocks_features\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_steps_steps_order_idx\` ON \`_pages_v_blocks_steps_steps\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_steps_steps_parent_id_idx\` ON \`_pages_v_blocks_steps_steps\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`background\` text DEFAULT 'white',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_steps_order_idx\` ON \`_pages_v_blocks_steps\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_steps_parent_id_idx\` ON \`_pages_v_blocks_steps\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_steps_path_idx\` ON \`_pages_v_blocks_steps\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`background\` text DEFAULT 'white',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_testimonials_order_idx\` ON \`_pages_v_blocks_testimonials\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_testimonials_parent_id_idx\` ON \`_pages_v_blocks_testimonials\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_testimonials_path_idx\` ON \`_pages_v_blocks_testimonials\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`category\` text,
  	\`background\` text DEFAULT 'white',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_faq_order_idx\` ON \`_pages_v_blocks_faq\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_faq_parent_id_idx\` ON \`_pages_v_blocks_faq\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_faq_path_idx\` ON \`_pages_v_blocks_faq\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'primary',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_cta_buttons_order_idx\` ON \`_pages_v_blocks_cta_buttons\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_cta_buttons_parent_id_idx\` ON \`_pages_v_blocks_cta_buttons\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`text\` text,
  	\`background\` text DEFAULT 'brand',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_cta_order_idx\` ON \`_pages_v_blocks_cta\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_cta_parent_id_idx\` ON \`_pages_v_blocks_cta\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_cta_path_idx\` ON \`_pages_v_blocks_cta\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_lead_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`default_product_id\` integer,
  	\`submit_label\` text DEFAULT 'Get a call back',
  	\`success_message\` text DEFAULT 'Thank you! Our loan expert will call you shortly.',
  	\`anchor_id\` text DEFAULT 'apply',
  	\`background\` text DEFAULT 'light',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`default_product_id\`) REFERENCES \`loan_products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_lead_form_order_idx\` ON \`_pages_v_blocks_lead_form\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_lead_form_parent_id_idx\` ON \`_pages_v_blocks_lead_form\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_lead_form_path_idx\` ON \`_pages_v_blocks_lead_form\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_lead_form_default_product_idx\` ON \`_pages_v_blocks_lead_form\` (\`default_product_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_emi_calculator\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`default_amount\` numeric DEFAULT 500000,
  	\`default_rate\` numeric DEFAULT 10.5,
  	\`default_tenure\` numeric DEFAULT 5,
  	\`max_amount\` numeric DEFAULT 10000000,
  	\`max_tenure\` numeric DEFAULT 30,
  	\`background\` text DEFAULT 'white',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_emi_calculator_order_idx\` ON \`_pages_v_blocks_emi_calculator\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_emi_calculator_parent_id_idx\` ON \`_pages_v_blocks_emi_calculator\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_emi_calculator_path_idx\` ON \`_pages_v_blocks_emi_calculator\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`,
  )
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`loan_products_id\` integer,
  	\`posts_id\` integer,
  	\`banks_id\` integer,
  	\`testimonials_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`loan_products_id\`) REFERENCES \`loan_products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`banks_id\`) REFERENCES \`banks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_pages_id_idx\` ON \`_pages_v_rels\` (\`pages_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_loan_products_id_idx\` ON \`_pages_v_rels\` (\`loan_products_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_posts_id_idx\` ON \`_pages_v_rels\` (\`posts_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_banks_id_idx\` ON \`_pages_v_rels\` (\`banks_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_testimonials_id_idx\` ON \`_pages_v_rels\` (\`testimonials_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`_pages_v_rels_faqs_id_idx\` ON \`_pages_v_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`excerpt\` text,
  	\`cover_image_id\` integer,
  	\`content\` text,
  	\`published_at\` text,
  	\`author_id\` integer,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_cover_image_idx\` ON \`posts\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_author_idx\` ON \`posts\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_meta_meta_image_idx\` ON \`posts\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`posts_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`posts_texts_order_parent\` ON \`posts_texts\` (\`order\`,\`parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_excerpt\` text,
  	\`version_cover_image_id\` integer,
  	\`version_content\` text,
  	\`version_published_at\` text,
  	\`version_author_id\` integer,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_author_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_cover_image_idx\` ON \`_posts_v\` (\`version_cover_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_author_idx\` ON \`_posts_v\` (\`version_author_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_meta_version_meta_image_idx\` ON \`_posts_v\` (\`version_meta_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`,
  )
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_autosave_idx\` ON \`_posts_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_posts_v_texts_order_parent\` ON \`_posts_v_texts\` (\`order\`,\`parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_hero_url\` text,
  	\`sizes_hero_width\` numeric,
  	\`sizes_hero_height\` numeric,
  	\`sizes_hero_mime_type\` text,
  	\`sizes_hero_filesize\` numeric,
  	\`sizes_hero_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(
    sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`media_sizes_hero_sizes_hero_filename_idx\` ON \`media\` (\`sizes_hero_filename\`);`,
  )
  await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`location\` text,
  	\`loan_type\` text,
  	\`quote\` text NOT NULL,
  	\`rating\` numeric DEFAULT 5,
  	\`photo_id\` integer,
  	\`published\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_photo_idx\` ON \`testimonials\` (\`photo_id\`);`)
  await db.run(
    sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE \`faqs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`category\` text DEFAULT 'general',
  	\`sort_order\` numeric DEFAULT 10,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`faqs_updated_at_idx\` ON \`faqs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`faqs_created_at_idx\` ON \`faqs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`loan_products_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`loan_products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`loan_products_features_order_idx\` ON \`loan_products_features\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`loan_products_features_parent_id_idx\` ON \`loan_products_features\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`loan_products_eligibility\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`loan_products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`loan_products_eligibility_order_idx\` ON \`loan_products_eligibility\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`loan_products_eligibility_parent_id_idx\` ON \`loan_products_eligibility\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`loan_products_documents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`loan_products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`loan_products_documents_order_idx\` ON \`loan_products_documents\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`loan_products_documents_parent_id_idx\` ON \`loan_products_documents\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`loan_products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`slug\` text,
  	\`category\` text,
  	\`icon\` text,
  	\`tagline\` text,
  	\`short_description\` text,
  	\`image_id\` integer,
  	\`key_facts_interest_rate\` text,
  	\`key_facts_loan_amount\` text,
  	\`key_facts_tenure\` text,
  	\`key_facts_processing_fee\` text,
  	\`content\` text,
  	\`calc_amount\` numeric DEFAULT 500000,
  	\`calc_rate\` numeric DEFAULT 10.5,
  	\`calc_tenure\` numeric DEFAULT 5,
  	\`calc_max_amount\` numeric DEFAULT 5000000,
  	\`calc_max_tenure\` numeric DEFAULT 7,
  	\`featured\` integer,
  	\`sort_order\` numeric DEFAULT 10,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`loan_products_slug_idx\` ON \`loan_products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`loan_products_image_idx\` ON \`loan_products\` (\`image_id\`);`)
  await db.run(
    sql`CREATE INDEX \`loan_products_meta_meta_image_idx\` ON \`loan_products\` (\`meta_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`loan_products_updated_at_idx\` ON \`loan_products\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`loan_products_created_at_idx\` ON \`loan_products\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE INDEX \`loan_products__status_idx\` ON \`loan_products\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`loan_products_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`banks_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`loan_products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`banks_id\`) REFERENCES \`banks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`loan_products_rels_order_idx\` ON \`loan_products_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`loan_products_rels_parent_idx\` ON \`loan_products_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`loan_products_rels_path_idx\` ON \`loan_products_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`loan_products_rels_banks_id_idx\` ON \`loan_products_rels\` (\`banks_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`loan_products_rels_faqs_id_idx\` ON \`loan_products_rels\` (\`faqs_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_loan_products_v_version_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_loan_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_version_features_order_idx\` ON \`_loan_products_v_version_features\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_version_features_parent_id_idx\` ON \`_loan_products_v_version_features\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_loan_products_v_version_eligibility\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_loan_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_version_eligibility_order_idx\` ON \`_loan_products_v_version_eligibility\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_version_eligibility_parent_id_idx\` ON \`_loan_products_v_version_eligibility\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_loan_products_v_version_documents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_loan_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_version_documents_order_idx\` ON \`_loan_products_v_version_documents\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_version_documents_parent_id_idx\` ON \`_loan_products_v_version_documents\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_loan_products_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_slug\` text,
  	\`version_category\` text,
  	\`version_icon\` text,
  	\`version_tagline\` text,
  	\`version_short_description\` text,
  	\`version_image_id\` integer,
  	\`version_key_facts_interest_rate\` text,
  	\`version_key_facts_loan_amount\` text,
  	\`version_key_facts_tenure\` text,
  	\`version_key_facts_processing_fee\` text,
  	\`version_content\` text,
  	\`version_calc_amount\` numeric DEFAULT 500000,
  	\`version_calc_rate\` numeric DEFAULT 10.5,
  	\`version_calc_tenure\` numeric DEFAULT 5,
  	\`version_calc_max_amount\` numeric DEFAULT 5000000,
  	\`version_calc_max_tenure\` numeric DEFAULT 7,
  	\`version_featured\` integer,
  	\`version_sort_order\` numeric DEFAULT 10,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`loan_products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_parent_idx\` ON \`_loan_products_v\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_version_version_slug_idx\` ON \`_loan_products_v\` (\`version_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_version_version_image_idx\` ON \`_loan_products_v\` (\`version_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_version_meta_version_meta_image_idx\` ON \`_loan_products_v\` (\`version_meta_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_version_version_updated_at_idx\` ON \`_loan_products_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_version_version_created_at_idx\` ON \`_loan_products_v\` (\`version_created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_version_version__status_idx\` ON \`_loan_products_v\` (\`version__status\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_created_at_idx\` ON \`_loan_products_v\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_updated_at_idx\` ON \`_loan_products_v\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_latest_idx\` ON \`_loan_products_v\` (\`latest\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_autosave_idx\` ON \`_loan_products_v\` (\`autosave\`);`,
  )
  await db.run(sql`CREATE TABLE \`_loan_products_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`banks_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_loan_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`banks_id\`) REFERENCES \`banks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_rels_order_idx\` ON \`_loan_products_v_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_rels_parent_idx\` ON \`_loan_products_v_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_rels_path_idx\` ON \`_loan_products_v_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_rels_banks_id_idx\` ON \`_loan_products_v_rels\` (\`banks_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_loan_products_v_rels_faqs_id_idx\` ON \`_loan_products_v_rels\` (\`faqs_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`banks_payout_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` integer NOT NULL,
  	\`rate\` numeric NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`loan_products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`banks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`banks_payout_grid_order_idx\` ON \`banks_payout_grid\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`banks_payout_grid_parent_id_idx\` ON \`banks_payout_grid\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`banks_payout_grid_product_idx\` ON \`banks_payout_grid\` (\`product_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`banks_contacts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`designation\` text,
  	\`branch\` text,
  	\`phone\` text,
  	\`email\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`banks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`banks_contacts_order_idx\` ON \`banks_contacts\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`banks_contacts_parent_id_idx\` ON \`banks_contacts\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`banks\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`type\` text DEFAULT 'bank',
  	\`logo_id\` integer,
  	\`website\` text,
  	\`show_on_website\` integer DEFAULT true,
  	\`sort_order\` numeric DEFAULT 10,
  	\`default_commission_rate\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`banks_logo_idx\` ON \`banks\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`banks_updated_at_idx\` ON \`banks\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`banks_created_at_idx\` ON \`banks\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`leads_bank_applications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bank_id\` integer NOT NULL,
  	\`application_ref\` text,
  	\`login_date\` text,
  	\`status\` text DEFAULT 'logged',
  	\`sanctioned_amount\` numeric,
  	\`interest_rate\` numeric,
  	\`remarks\` text,
  	FOREIGN KEY (\`bank_id\`) REFERENCES \`banks\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`leads_bank_applications_order_idx\` ON \`leads_bank_applications\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`leads_bank_applications_parent_id_idx\` ON \`leads_bank_applications\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`leads_bank_applications_bank_idx\` ON \`leads_bank_applications\` (\`bank_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`leads\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`full_name\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`alternate_phone\` text,
  	\`email\` text,
  	\`date_of_birth\` text,
  	\`pan\` text,
  	\`city\` text,
  	\`pincode\` text,
  	\`address\` text,
  	\`employment_type\` text,
  	\`employer_name\` text,
  	\`monthly_income\` numeric,
  	\`existing_emis\` numeric,
  	\`cibil_score\` numeric,
  	\`loan_product_id\` integer,
  	\`amount_required\` numeric,
  	\`tenure_years\` numeric,
  	\`purpose\` text,
  	\`property_type\` text,
  	\`property_value\` numeric,
  	\`property_city\` text,
  	\`disbursing_bank_id\` integer,
  	\`sanctioned_amount\` numeric,
  	\`disbursed_amount\` numeric,
  	\`disbursal_date\` text,
  	\`commission_rate\` numeric,
  	\`commission_amount\` numeric,
  	\`commission_status\` text DEFAULT 'pending',
  	\`commission_received_on\` text,
  	\`source\` text DEFAULT 'phone',
  	\`referred_by\` text,
  	\`utm_source\` text,
  	\`utm_medium\` text,
  	\`utm_campaign\` text,
  	\`landing_page\` text,
  	\`consent\` integer,
  	\`consent_at\` text,
  	\`message\` text,
  	\`lead_number\` text,
  	\`status\` text DEFAULT 'new' NOT NULL,
  	\`priority\` text DEFAULT 'warm',
  	\`assigned_to_id\` integer,
  	\`next_follow_up\` text,
  	\`possible_duplicate\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`loan_product_id\`) REFERENCES \`loan_products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`disbursing_bank_id\`) REFERENCES \`banks\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`assigned_to_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`leads_phone_idx\` ON \`leads\` (\`phone\`);`)
  await db.run(sql`CREATE INDEX \`leads_loan_product_idx\` ON \`leads\` (\`loan_product_id\`);`)
  await db.run(
    sql`CREATE INDEX \`leads_disbursing_bank_idx\` ON \`leads\` (\`disbursing_bank_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`leads_lead_number_idx\` ON \`leads\` (\`lead_number\`);`)
  await db.run(sql`CREATE INDEX \`leads_status_idx\` ON \`leads\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`leads_assigned_to_idx\` ON \`leads\` (\`assigned_to_id\`);`)
  await db.run(sql`CREATE INDEX \`leads_next_follow_up_idx\` ON \`leads\` (\`next_follow_up\`);`)
  await db.run(sql`CREATE INDEX \`leads_updated_at_idx\` ON \`leads\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`leads_created_at_idx\` ON \`leads\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`lead_activities\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`lead_id\` integer NOT NULL,
  	\`type\` text DEFAULT 'call' NOT NULL,
  	\`next_follow_up\` text,
  	\`summary\` text NOT NULL,
  	\`details\` text,
  	\`created_by_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`lead_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`lead_activities_lead_idx\` ON \`lead_activities\` (\`lead_id\`);`)
  await db.run(
    sql`CREATE INDEX \`lead_activities_created_by_idx\` ON \`lead_activities\` (\`created_by_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`lead_activities_updated_at_idx\` ON \`lead_activities\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`lead_activities_created_at_idx\` ON \`lead_activities\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE \`lead_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`lead_id\` integer NOT NULL,
  	\`document_type\` text NOT NULL,
  	\`verified\` integer,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	FOREIGN KEY (\`lead_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`lead_documents_lead_idx\` ON \`lead_documents\` (\`lead_id\`);`)
  await db.run(
    sql`CREATE INDEX \`lead_documents_updated_at_idx\` ON \`lead_documents\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`lead_documents_created_at_idx\` ON \`lead_documents\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX \`lead_documents_filename_idx\` ON \`lead_documents\` (\`filename\`);`,
  )
  await db.run(sql`CREATE TABLE \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`phone\` text,
  	\`active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`exports\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`format\` text DEFAULT 'csv' NOT NULL,
  	\`limit\` numeric,
  	\`page\` numeric DEFAULT 1,
  	\`sort\` text,
  	\`sort_order\` text,
  	\`drafts\` text DEFAULT 'yes',
  	\`collection_slug\` text DEFAULT 'leads' NOT NULL,
  	\`where\` text DEFAULT '{}',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`exports_updated_at_idx\` ON \`exports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`exports_created_at_idx\` ON \`exports\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`exports_filename_idx\` ON \`exports\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`exports_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`exports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`exports_texts_order_parent\` ON \`exports_texts\` (\`order\`,\`parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`imports\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`collection_slug\` text DEFAULT 'leads' NOT NULL,
  	\`import_mode\` text,
  	\`match_field\` text DEFAULT 'id',
  	\`status\` text DEFAULT 'pending',
  	\`summary_imported\` numeric,
  	\`summary_updated\` numeric,
  	\`summary_total\` numeric,
  	\`summary_issues\` numeric,
  	\`summary_issue_details\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`imports_updated_at_idx\` ON \`imports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`imports_created_at_idx\` ON \`imports\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`imports_filename_idx\` ON \`imports\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`executed_at\` text NOT NULL,
  	\`completed_at\` text NOT NULL,
  	\`task_slug\` text NOT NULL,
  	\`task_i_d\` text NOT NULL,
  	\`input\` text,
  	\`output\` text,
  	\`state\` text NOT NULL,
  	\`error\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`payload_jobs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`input\` text,
  	\`completed_at\` text,
  	\`total_tried\` numeric DEFAULT 0,
  	\`has_error\` integer DEFAULT false,
  	\`error\` text,
  	\`task_slug\` text,
  	\`queue\` text DEFAULT 'default',
  	\`wait_until\` text,
  	\`processing\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(
    sql`CREATE INDEX \`payload_jobs_completed_at_idx\` ON \`payload_jobs\` (\`completed_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_jobs_total_tried_idx\` ON \`payload_jobs\` (\`total_tried\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_jobs_has_error_idx\` ON \`payload_jobs\` (\`has_error\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_jobs_task_slug_idx\` ON \`payload_jobs\` (\`task_slug\`);`,
  )
  await db.run(sql`CREATE INDEX \`payload_jobs_queue_idx\` ON \`payload_jobs\` (\`queue\`);`)
  await db.run(
    sql`CREATE INDEX \`payload_jobs_wait_until_idx\` ON \`payload_jobs\` (\`wait_until\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_jobs_processing_idx\` ON \`payload_jobs\` (\`processing\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_jobs_updated_at_idx\` ON \`payload_jobs\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_jobs_created_at_idx\` ON \`payload_jobs\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`media_id\` integer,
  	\`testimonials_id\` integer,
  	\`faqs_id\` integer,
  	\`loan_products_id\` integer,
  	\`banks_id\` integer,
  	\`leads_id\` integer,
  	\`lead_activities_id\` integer,
  	\`lead_documents_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`loan_products_id\`) REFERENCES \`loan_products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`banks_id\`) REFERENCES \`banks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leads_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lead_activities_id\`) REFERENCES \`lead_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lead_documents_id\`) REFERENCES \`lead_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_faqs_id_idx\` ON \`payload_locked_documents_rels\` (\`faqs_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_loan_products_id_idx\` ON \`payload_locked_documents_rels\` (\`loan_products_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_banks_id_idx\` ON \`payload_locked_documents_rels\` (\`banks_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_leads_id_idx\` ON \`payload_locked_documents_rels\` (\`leads_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_lead_activities_id_idx\` ON \`payload_locked_documents_rels\` (\`lead_activities_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_lead_documents_id_idx\` ON \`payload_locked_documents_rels\` (\`lead_documents_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(
    sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(
    sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE \`header_nav_items_children\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`header_nav_items_children_order_idx\` ON \`header_nav_items_children\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`header_nav_items_children_parent_id_idx\` ON \`header_nav_items_children\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`announcement\` text,
  	\`show_loan_menu\` integer DEFAULT true,
  	\`cta_type\` text DEFAULT 'reference',
  	\`cta_new_tab\` integer,
  	\`cta_url\` text,
  	\`cta_label\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`header_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`loan_products_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`loan_products_id\`) REFERENCES \`loan_products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_rels_order_idx\` ON \`header_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_parent_idx\` ON \`header_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_path_idx\` ON \`header_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_pages_id_idx\` ON \`header_rels\` (\`pages_id\`);`)
  await db.run(
    sql`CREATE INDEX \`header_rels_loan_products_id_idx\` ON \`header_rels\` (\`loan_products_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`header_rels_posts_id_idx\` ON \`header_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`footer_columns_links_order_idx\` ON \`footer_columns_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`footer_columns_links_parent_id_idx\` ON \`footer_columns_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_order_idx\` ON \`footer_columns\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`footer_columns_parent_id_idx\` ON \`footer_columns\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`footer_bottom_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`footer_bottom_links_order_idx\` ON \`footer_bottom_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`footer_bottom_links_parent_id_idx\` ON \`footer_bottom_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`about\` text,
  	\`copyright\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`loan_products_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`loan_products_id\`) REFERENCES \`loan_products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_pages_id_idx\` ON \`footer_rels\` (\`pages_id\`);`)
  await db.run(
    sql`CREATE INDEX \`footer_rels_loan_products_id_idx\` ON \`footer_rels\` (\`loan_products_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`footer_rels_posts_id_idx\` ON \`footer_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_social\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`site_settings_social_order_idx\` ON \`site_settings_social\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_social_parent_id_idx\` ON \`site_settings_social\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`site_settings_crm_notify_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`site_settings_crm_notify_emails_order_idx\` ON \`site_settings_crm_notify_emails\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_crm_notify_emails_parent_id_idx\` ON \`site_settings_crm_notify_emails\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`site_name\` text DEFAULT 'Finsol' NOT NULL,
  	\`tagline\` text DEFAULT 'Your trusted loan partner',
  	\`logo_id\` integer,
  	\`logo_light_id\` integer,
  	\`favicon_id\` integer,
  	\`phone\` text,
  	\`whatsapp\` text,
  	\`email\` text,
  	\`address\` text,
  	\`business_hours\` text DEFAULT 'Mon – Sat, 10:00 am – 7:00 pm',
  	\`map_embed_url\` text,
  	\`primary_color\` text DEFAULT '#0b4f9c',
  	\`accent_color\` text DEFAULT '#f59e0b',
  	\`disclaimer\` text DEFAULT 'We are a Direct Selling Agent (DSA) and loan facilitator. We do not lend money ourselves. Loans are sanctioned at the sole discretion of the partner bank / NBFC, subject to their credit policies. Interest rates and charges are indicative and may change.',
  	\`registration_info\` text,
  	\`consent_text\` text DEFAULT 'I authorise the team and its partner banks to contact me via call, SMS, WhatsApp or email regarding my loan enquiry. This overrides DND/NDNC registration.',
  	\`default_meta_description\` text,
  	\`default_og_image_id\` integer,
  	\`google_analytics_id\` text,
  	\`meta_pixel_id\` text,
  	\`crm_auto_assign\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`logo_light_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`favicon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`default_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_logo_idx\` ON \`site_settings\` (\`logo_id\`);`)
  await db.run(
    sql`CREATE INDEX \`site_settings_logo_light_idx\` ON \`site_settings\` (\`logo_light_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_favicon_idx\` ON \`site_settings\` (\`favicon_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_default_og_image_idx\` ON \`site_settings\` (\`default_og_image_id\`);`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_trust_points\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_media_content_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_media_content\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_loan_products\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_partner_banks\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_features_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_features\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_lead_form\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_emi_calculator\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_trust_points\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_media_content_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_media_content\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_loan_products\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_partner_banks\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_features_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_features\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_steps\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_lead_form\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_emi_calculator\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_texts\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_texts\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`faqs\`;`)
  await db.run(sql`DROP TABLE \`loan_products_features\`;`)
  await db.run(sql`DROP TABLE \`loan_products_eligibility\`;`)
  await db.run(sql`DROP TABLE \`loan_products_documents\`;`)
  await db.run(sql`DROP TABLE \`loan_products\`;`)
  await db.run(sql`DROP TABLE \`loan_products_rels\`;`)
  await db.run(sql`DROP TABLE \`_loan_products_v_version_features\`;`)
  await db.run(sql`DROP TABLE \`_loan_products_v_version_eligibility\`;`)
  await db.run(sql`DROP TABLE \`_loan_products_v_version_documents\`;`)
  await db.run(sql`DROP TABLE \`_loan_products_v\`;`)
  await db.run(sql`DROP TABLE \`_loan_products_v_rels\`;`)
  await db.run(sql`DROP TABLE \`banks_payout_grid\`;`)
  await db.run(sql`DROP TABLE \`banks_contacts\`;`)
  await db.run(sql`DROP TABLE \`banks\`;`)
  await db.run(sql`DROP TABLE \`leads_bank_applications\`;`)
  await db.run(sql`DROP TABLE \`leads\`;`)
  await db.run(sql`DROP TABLE \`lead_activities\`;`)
  await db.run(sql`DROP TABLE \`lead_documents\`;`)
  await db.run(sql`DROP TABLE \`users_roles\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`exports\`;`)
  await db.run(sql`DROP TABLE \`exports_texts\`;`)
  await db.run(sql`DROP TABLE \`imports\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items_children\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`header_rels\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns\`;`)
  await db.run(sql`DROP TABLE \`footer_bottom_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer_rels\`;`)
  await db.run(sql`DROP TABLE \`site_settings_social\`;`)
  await db.run(sql`DROP TABLE \`site_settings_crm_notify_emails\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
}
