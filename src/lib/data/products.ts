/**
 * Smart Filling Technologies — Product Data
 * ==========================================
 * Single source of truth for all product specifications.
 * Non-developers can edit specs here without touching component code.
 */

export type ProductCategory = "semi-automatic" | "automatic" | "spm";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  brand?: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDescription: string;
  description: string;
  specs: ProductSpec[];
  usageAndApplications: string;
  suitableForPacking?: string[];
  features?: string[];
  /** Path to product image — replace with real photos when available */
  image: string;
  /** Gradient colors for placeholder image backgrounds */
  placeholderGradient: [string, string];
}

export const CATEGORIES: { id: ProductCategory; label: string; description: string }[] = [
  {
    id: "semi-automatic",
    label: "Semi-Automatic Machines",
    description: "Precision-engineered semi-automatic filling systems with PLC control and servo-driven accuracy for pharmaceutical and pesticide production.",
  },
  {
    id: "automatic",
    label: "Automatic Machines",
    description: "High-speed automatic filling, packing, and sealing systems for continuous production lines across pharma, agrochemical, and food industries.",
  },
  {
    id: "spm",
    label: "SPM Machines",
    description: "Special purpose machinery — turn tables, conveyors, labelling, and capping systems to complete your production line.",
  },
];

export const products: Product[] = [
  // ─────────────────────────────────────────────────
  //  SEMI-AUTOMATIC MACHINES
  // ─────────────────────────────────────────────────
  {
    slug: "2-head-bottle-filling-machine",
    name: "2-Head Bottle Filling Machine",
    
    category: "semi-automatic",
    categoryLabel: "Semi-Automatic Machines",
    shortDescription: "Auger screw based powder filling with PLC control and servo precision.",
    description: "Semi-automatic powder bottle filling machine designed for pharmaceutical and pesticide production environments. Features auger screw based filling mechanism with PLC control and servo-driven accuracy.",
    specs: [
      
      { label: "Type", value: "Semi automatic powder bottle filling machine" },
      { label: "Input Supply", value: "Three Phase 415VAC" },
      { label: "Control Mode", value: "Semi Automatic" },
      { label: "Material", value: "Stainless Steel 304" },
      { label: "Controller", value: "PLC (09DI / 09DO), inbuilt HMI 4.3\" touchscreen, 750W servo" },
      { label: "Machine Speed", value: "Not applicable for semi-automatic" },
      { label: "Warranty", value: "Yes" },
      { label: "Payment Terms", value: "100% against delivery" },
      { label: "Delivery Time", value: "5 to 6 weeks / ready" },
      { label: "Export Markets", value: "Asia and South Africa" },
      { label: "MOQ", value: "1 machine" },
      { label: "Returnable", value: "No" },
      { label: "GST", value: "18% applicable" },
    ],
    usageAndApplications: "Auger screw based powder filling in pharmaceutical and pesticides production. The semi-automatic operation allows an operator to precisely control each fill cycle, making it ideal for smaller batches and product changeovers where flexibility matters more than throughput speed.",
    image: "/images/products/machine-2head.png",
    placeholderGradient: ["#1E5AA8", "#14181C"],
  },
  {
    slug: "semi-automatic-auger-filling-machine",
    name: "Semi Automatic Auger Filling Machine",
    
    category: "semi-automatic",
    categoryLabel: "Semi-Automatic Machines",
    shortDescription: "Single phase auger filler with PLC and HMI touchscreen control.",
    description: "Semi-automatic bottle filling machine operating on single phase power, ideal for facilities without three-phase supply. Features the same PLC and servo precision as the larger models.",
    specs: [
      
      { label: "Type", value: "Semi automatic bottle filling machine" },
      { label: "Input Supply", value: "Single Phase 220VAC" },
      { label: "Frequency", value: "50–60 Hz" },
      { label: "Material", value: "Stainless Steel 304" },
      { label: "Controller", value: "PLC (09DI / 09DO), inbuilt HMI 4.3\" touchscreen, 750W servo" },
      { label: "Warranty", value: "Yes" },
      { label: "Payment Terms", value: "100% against delivery" },
      { label: "Delivery Time", value: "5 to 6 weeks / ready" },
      { label: "Export Markets", value: "Asia and South Africa" },
      { label: "MOQ", value: "1 machine" },
      { label: "Returnable", value: "No" },
      { label: "GST", value: "18% applicable" },
    ],
    usageAndApplications: "Used to securely seal vials with caps or stoppers after filling, ensuring leak-proof and contamination-free packaging in pharmaceutical and pesticides production. The single-phase 220VAC input makes it accessible for a wider range of facility setups.",
    image: "/images/products/machine-auger-semi.png",
    placeholderGradient: ["#1E5AA8", "#2a6dba"],
  },

  // ─────────────────────────────────────────────────
  //  AUTOMATIC MACHINES
  // ─────────────────────────────────────────────────
  {
    slug: "4-head-bottle-filling-machine",
    name: "4-Head Bottle Filling Machine",
    
    category: "automatic",
    categoryLabel: "Automatic Machines",
    shortDescription: "12–18 BPM automatic filling with 7\" HMI touchscreen and PLC control.",
    description: "Fully automatic 4-head bottle filling machine delivering 12–18 bottles per minute. Equipped with advanced PLC controller and 7-inch HMI touchscreen for precise operation monitoring.",
    specs: [
      
      { label: "Control Mode", value: "Automatic" },
      { label: "Controller", value: "PLC (32DI / 28DO), HMI 7\" touchscreen, 750W servo" },
      { label: "Machine Speed", value: "12–18 BPM" },
      { label: "Input Supply", value: "Three Phase 415VAC" },
      { label: "Material", value: "Stainless Steel 304" },
      { label: "Warranty", value: "Yes" },
      { label: "Payment Terms", value: "100% against delivery" },
      { label: "Delivery Time", value: "5 to 6 weeks / ready" },
      { label: "Export Markets", value: "Asia and South Africa" },
      { label: "MOQ", value: "1 machine" },
      { label: "Returnable", value: "No" },
      { label: "GST", value: "18% applicable" },
    ],
    usageAndApplications: "Securely seals vials with caps or stoppers after filling — delivering leak-proof, contamination-free packaging for pharmaceutical and pesticides production. The automatic operation and 12–18 BPM throughput make it suitable for medium-volume production lines requiring consistent output.",
    image: "/images/products/machine-4head.png",
    placeholderGradient: ["#14181C", "#1E5AA8"],
  },
  {
    slug: "6-head-bottle-filling-machine",
    name: "6-Head Bottle Filling Machine",
    
    category: "automatic",
    categoryLabel: "Automatic Machines",
    shortDescription: "18–24 BPM high-speed filling with 7\" HMI and servo-driven precision.",
    description: "High-speed automatic 6-head bottle filling machine delivering 18–24 bottles per minute. The flagship filling machine for high-volume production environments.",
    specs: [
      
      { label: "Control Mode", value: "Automatic" },
      { label: "Controller", value: "PLC (32DI / 28DO), HMI 7\" touchscreen, 750W servo" },
      { label: "Machine Speed", value: "18–24 BPM" },
      { label: "Input Supply", value: "Three Phase 415VAC" },
      { label: "Material", value: "Stainless Steel 304" },
      { label: "Warranty", value: "Yes" },
      { label: "Payment Terms", value: "100% against delivery" },
      { label: "Delivery Time", value: "5 to 6 weeks / ready" },
      { label: "Export Markets", value: "Asia and South Africa" },
      { label: "MOQ", value: "1 machine" },
      { label: "Returnable", value: "No" },
      { label: "GST", value: "18% applicable" },
    ],
    usageAndApplications: "Leak-proof, contamination-free packaging for pharmaceutical and pesticides production. At 18–24 BPM, this is the highest-throughput filling machine in the Smart Filling range, designed for production lines where speed and consistency are both critical.",
    image: "/images/products/machine-6head.png",
    placeholderGradient: ["#1a2f4a", "#1E5AA8"],
  },
  {
    slug: "automatic-powder-filling-machine-bottles",
    name: "Automatic Powder Filling Machine for Bottles",
    
    category: "automatic",
    categoryLabel: "Automatic Machines",
    shortDescription: "Auger filler with hopper, stirrer, and servo-driven high-accuracy filling.",
    description: "Automatic auger filler where material is stored in a hopper with a stirrer to prevent powder bridging. Servo motor drive delivers high accuracy and high-speed filling across a wide range of powder products.",
    specs: [
      
      { label: "Control Mode", value: "Automatic" },
      { label: "Filling Type", value: "Auger screw based" },
      { label: "Hopper", value: "With stirrer (prevents bridging)" },
      { label: "Drive System", value: "Servo motor (high accuracy, high speed)" },
      { label: "Material", value: "Stainless Steel 304" },
      { label: "Format", value: "Bottles" },
      { label: "Warranty", value: "Yes" },
      { label: "Payment Terms", value: "100% against delivery" },
      { label: "Delivery Time", value: "5 to 6 weeks / ready" },
      { label: "Export Markets", value: "Asia and South Africa" },
      { label: "MOQ", value: "1 machine" },
      { label: "GST", value: "18% applicable" },
    ],
    usageAndApplications: "Designed for high-speed powder filling in bottle formats. The hopper-mounted stirrer prevents powder bridging, while the servo motor drive ensures consistent fill weights across every cycle.",
    suitableForPacking: [
      "Wheat flour (atta)",
      "Rice flour",
      "Besan",
      "Spices",
      "Chilli powder",
      "Turmeric powder",
      "Coffee powder",
      "Curry powder",
      "Chemical powder",
      "Bleaching powder",
    ],
    image: "/images/products/machine-powder-bottle.png",
    placeholderGradient: ["#1E5AA8", "#D98E3B"],
  },
  {
    slug: "automatic-auger-filling-machine-pouches",
    name: "Automatic Auger Filling Machine for Pouches",
    
    category: "automatic",
    categoryLabel: "Automatic Machines",
    shortDescription: "Complete pouch filling system with PLC, servo, and eye-mark control.",
    description: "Automatic auger filling machine designed for pouch format packaging. Same proven auger filler mechanism with comprehensive pouch-forming, filling, and sealing capabilities for continuous 24/7 operation.",
    specs: [
      
      { label: "Control Mode", value: "Automatic" },
      { label: "Product Form", value: "Powder" },
      { label: "Hopper Capacity", value: "30 kg" },
      { label: "Weighing Range", value: "100g to 1kg" },
      { label: "Output", value: "30–50 kg/minute" },
      { label: "Film Type", value: "Heat sealable laminated plastic" },
      { label: "Material", value: "SS304 contact parts & MS body" },
      { label: "Input Power Supply", value: "3 Phase, 415 VAC" },
      { label: "Air Supply", value: "2 HP, 6 Bar compressor" },
      { label: "Film Draw", value: "Servo / VFD" },
      { label: "Horizontal Sealing", value: "Pneumatic" },
      { label: "Vertical Sealing", value: "Pneumatic" },
      { label: "Auger Drive", value: "Servo Drive" },
      { label: "Warranty", value: "Yes" },
      { label: "Payment Terms", value: "100% against delivery" },
      { label: "Delivery Time", value: "5 to 6 weeks / ready" },
      { label: "Export Markets", value: "Asia and South Africa" },
      { label: "MOQ", value: "1 machine" },
      { label: "GST", value: "18% applicable" },
    ],
    usageAndApplications: "Complete pouch packaging solution for powder products. Maintenance-free 24×7 operation with PLC control, HMI interface, and servo-based feeding delivers speed and accuracy. Eye-mark controller ensures precise sealing, with provisions for batch printing, roll change system, pouch counter (batch/day-wise), optional servo horizontal sealer, collar-type forming system, level controller for screw conveyor, and durable timing belt film pulling.",
    suitableForPacking: [
      "Wheat flour (atta)",
      "Rice flour",
      "Besan",
      "Spices",
      "Chilli powder",
      "Turmeric powder",
      "Coffee powder",
      "Curry powder",
      "Chemical powder",
      "Bleaching powder",
    ],
    features: [
      "Maintenance-free 24×7 operation",
      "PLC control with HMI user interface",
      "Servo-based feeding for speed & accuracy",
      "Eye-mark controller for precise sealing",
      "Batch printing system provision",
      "Roll change system (optional)",
      "Pouch counter (batch/day-wise)",
      "Optional servo horizontal sealer",
      "Collar-type forming system",
      "Leak-proof sealing",
      "Level controller for screw conveyor",
      "Durable timing belt film pulling",
      "12 KVA stabilizer (optional)",
      "Strip-cut / single-cut system",
    ],
    image: "/images/products/machine-pouch.png",
    placeholderGradient: ["#D98E3B", "#14181C"],
  },

  // ─────────────────────────────────────────────────
  //  SPM (SPECIAL PURPOSE MACHINES)
  // ─────────────────────────────────────────────────
  {
    slug: "turn-table",
    name: "Turn Table",
    
    category: "spm",
    categoryLabel: "SPM Machines",
    shortDescription: "VFD-controlled rotary table for automatic bottle feeding.",
    description: "Automatic turn table for bottle feeding applications. VFD-controlled single-phase operation provides smooth, variable-speed bottle orientation and feeding into your production line.",
    specs: [
      
      { label: "Type", value: "Turn Table" },
      { label: "Control Mode", value: "Automatic" },
      { label: "Controller", value: "1HP Single Phase VFD" },
      { label: "Machine Speed", value: "50–60 Hz" },
      { label: "Input Supply", value: "Single Phase 220VAC" },
      { label: "Material", value: "Stainless Steel 304" },
      { label: "Warranty", value: "Yes" },
      { label: "Payment Terms", value: "100% against delivery" },
      { label: "Delivery Time", value: "5 to 6 weeks / ready" },
      { label: "Export Markets", value: "Asia and South Africa" },
      { label: "MOQ", value: "1 machine" },
      { label: "Returnable", value: "No" },
      { label: "GST", value: "18% applicable" },
    ],
    usageAndApplications: "Bottle feeding into production lines. The turn table provides consistent, controlled bottle orientation and feeding, serving as the starting point of an automated filling line.",
    image: "/images/products/machine-turntable.png",
    placeholderGradient: ["#14181C", "#1a2f4a"],
  },
  {
    slug: "labelling-machine",
    name: "Labelling Machine",
    
    category: "spm",
    categoryLabel: "SPM Machines",
    shortDescription: "30 BPM automatic round bottle sticker labelling at 240V/60Hz.",
    description: "Automatic round bottle labelling machine capable of 30 bottles per minute. Designed for precise sticker label application on cylindrical containers.",
    specs: [
      
      { label: "Machine Type", value: "Round bottle labeling" },
      { label: "Frequency", value: "60 Hz" },
      { label: "Voltage", value: "240V" },
      { label: "Speed", value: "30 BPM" },
      { label: "Automation Grade", value: "Automatic" },
      { label: "Material", value: "Stainless Steel" },
      { label: "Bottle Type", value: "Round" },
      { label: "Application", value: "Sticker labeling" },
      { label: "Availability", value: "In stock" },
    ],
    usageAndApplications: "Automatic sticker labelling for round bottles at 30 bottles per minute. Delivers consistent label placement across your production run, ensuring professional product presentation for pharmaceutical, agrochemical, and food products.",
    image: "/images/products/machine-auger-semi.png",
    placeholderGradient: ["#1E5AA8", "#14181C"],
  },
  {
    slug: "rotary-capping-machine",
    name: "Rotary Capping Machine",
    
    category: "spm",
    categoryLabel: "SPM Machines",
    shortDescription: "Precise torque control vial capping for pharma and pesticide production.",
    description: "Vial capping machine that securely seals vials with aluminum or flip-off caps after filling. Ensures tight, contamination-free sealing critical for product sterility and integrity. Available semi-automatic or fully automatic with precise torque control and high-speed operation.",
    specs: [
      
      { label: "Type", value: "Rotary Capping Machine" },
      { label: "Input Supply", value: "Single Phase" },
      { label: "Frequency", value: "50–60 Hz" },
      { label: "Voltage", value: "220V" },
      { label: "Material", value: "Stainless Steel" },
      { label: "Feature", value: "Highly efficient" },
      { label: "Control Mode", value: "Automatic" },
      { label: "Warranty", value: "Yes" },
      { label: "Payment Terms", value: "100% against delivery" },
      { label: "Delivery Time", value: "5 to 6 weeks" },
      { label: "Export Markets", value: "Asia and South Africa" },
      { label: "MOQ", value: "1" },
      { label: "GST", value: "18% applicable" },
    ],
    usageAndApplications: "Securely seals vials with caps or stoppers after filling — delivering leak-proof, contamination-free packaging in pharmaceutical and pesticides production. Precise torque control ensures consistent seal integrity across every vial, compatible with various vial sizes and cap types including aluminum and flip-off caps.",
    image: "/images/products/machine-capping.png",
    placeholderGradient: ["#2a6dba", "#14181C"],
  },
  {
    slug: "conveyor",
    name: "Conveyor",
    
    category: "spm",
    categoryLabel: "SPM Machines",
    shortDescription: "1.5m to 5m SS304 conveyor with VFD speed control.",
    description: "Stainless Steel 304 conveyor system available in 1.5 to 5 meter lengths. VFD-controlled for variable speed operation, designed to integrate seamlessly with our filling and packing lines.",
    specs: [
      
      { label: "Type", value: "Conveyor, 1.5m to 5m" },
      { label: "Control Mode", value: "Automatic" },
      { label: "Controller", value: "1HP Single Phase VFD" },
      { label: "Machine Speed", value: "50–60 Hz" },
      { label: "Input Supply", value: "Single Phase 220VAC" },
      { label: "Material", value: "Stainless Steel 304" },
      { label: "Warranty", value: "Yes" },
      { label: "Payment Terms", value: "100% against delivery" },
      { label: "Delivery Time", value: "5 to 6 weeks" },
      { label: "Export Markets", value: "Asia and South Africa" },
      { label: "MOQ", value: "1 machine" },
      { label: "Returnable", value: "No" },
      { label: "GST", value: "18% applicable" },
    ],
    usageAndApplications: "Bottle feeding and product transport between stations in your production line. Available in 1.5 to 5 meter configurations to match your facility layout. VFD speed control allows fine-tuning of conveyor speed to match upstream and downstream equipment throughput.",
    image: "/images/products/machine-conveyor.png",
    placeholderGradient: ["#14181C", "#D98E3B"],
  },
];

/** Get all products in a given category */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

/** Get a single product by its slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Get related products (same category, excluding the current product) */
export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return [];
  return products
    .filter((p) => p.category === current.category && p.slug !== slug)
    .slice(0, limit);
}

/** All products suitable for use as a dropdown in the quote form */
export function getProductNames(): string[] {
  return products.map((p) => p.name);
}
