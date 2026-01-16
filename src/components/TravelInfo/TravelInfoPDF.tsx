import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  TravelInfoCategory,
  CategoryState,
} from "@/components/TravelInfo/types";
import {
  BasicCountryInfo,
  CATEGORY_LABELS,
  SafetyInfo,
  ClimateInfo,
  VisaInfo,
  MannerInfo,
  TransportInfo,
  DANGER_LEVEL_DESCRIPTIONS,
} from "@/lib/types/travel-info";

// Register fonts (assuming this is handled in the parent loader, but useful for reference)
// Note: Font registration is usually done once globally or in the PDF generator function.

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Noto Sans JP",
    fontSize: 10,
    backgroundColor: "#fcfbf9", // Cream paper background
    color: "#2c2c2c", // Ink black text
  },
  header: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e67e22", // Terracotta
    borderBottomStyle: "dashed",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  brandText: {
    fontSize: 8,
    color: "#e67e22",
    marginBottom: 4,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  destinationBox: {
    marginTop: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "#2c2c2c",
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
  },
  destination: {
    fontSize: 24,
    fontWeight: 700,
    color: "#2c2c2c",
  },
  metaInfo: {
    fontSize: 9,
    color: "#6b7280",
    marginTop: 4,
  },

  // Section Styles
  section: {
    marginBottom: 20,
    breakInside: "avoid",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 5,
  },
  sectionIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#e67e22",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionIconText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#2c2c2c",
  },

  // Content Styles
  contentBox: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: "30%",
    fontSize: 9,
    fontWeight: 700,
    color: "#6b7280",
  },
  value: {
    flex: 1,
    fontSize: 9,
    color: "#2c2c2c",
  },
  textBlock: {
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 6,
    color: "#4b5563",
  },

  // Specific Component Styles
  dangerBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  dangerBadgeText: {
    color: "#ffffff",
    fontSize: 8,
    fontWeight: "bold",
  },
  warningItem: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 4,
  },
  bullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#e67e22",
    marginRight: 6,
    marginTop: 5,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: "#9ca3af",
  },
  footerBrand: {
    fontSize: 8,
    color: "#e67e22",
    fontWeight: 700,
  },
});

interface TravelInfoPDFProps {
  destination: string;
  country: string;
  categoryStates: Map<TravelInfoCategory, CategoryState>;
}

// Helper to render Basic Info
const BasicInfoView = ({ data }: { data: BasicCountryInfo }) => (
  <View style={styles.contentBox}>
    <View style={styles.row}>
      <Text style={styles.label}>通貨</Text>
      <Text style={styles.value}>{data.currency.name} ({data.currency.code})</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>言語</Text>
      <Text style={styles.value}>{data.languages.join(", ")}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>タイムゾーン</Text>
      <Text style={styles.value}>{data.timezone}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>時差</Text>
      <Text style={styles.value}>{data.timeDifference}</Text>
    </View>
  </View>
);

// Helper to render Safety Info
const SafetyInfoView = ({ data }: { data: SafetyInfo }) => {
  const getDangerColor = (level: number) => {
    switch (level) {
      case 0: return "#10b981"; // Green
      case 1: return "#f59e0b"; // Yellow
      case 2: return "#f97316"; // Orange
      case 3: return "#ef4444"; // Red
      case 4: return "#7f1d1d"; // Dark Red
      default: return "#6b7280";
    }
  };

  return (
    <View style={styles.contentBox}>
      <View style={[styles.dangerBadge, { backgroundColor: getDangerColor(data.dangerLevel) }]}>
        <Text style={styles.dangerBadgeText}>
          レベル{data.dangerLevel}: {DANGER_LEVEL_DESCRIPTIONS[data.dangerLevel]}
        </Text>
      </View>
      <Text style={styles.textBlock}>{data.dangerLevelDescription}</Text>

      <Text style={[styles.label, { marginTop: 8, marginBottom: 4 }]}>緊急連絡先</Text>
      {data.emergencyContacts.map((contact, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.label}>{contact.name}</Text>
          <Text style={styles.value}>{contact.number}</Text>
        </View>
      ))}

      {data.warnings.length > 0 && (
        <View style={{ marginTop: 8 }}>
          <Text style={[styles.label, { marginBottom: 4 }]}>注意事項</Text>
          {data.warnings.map((warning, i) => (
            <View key={i} style={styles.warningItem}>
              <View style={styles.bullet} />
              <Text style={[styles.value, { fontSize: 8 }]}>{warning}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// Helper to render Climate Info
const ClimateInfoView = ({ data }: { data: ClimateInfo }) => (
  <View style={styles.contentBox}>
    <Text style={[styles.textBlock, { marginBottom: 10 }]}>{data.seasonDescription}</Text>

    <Text style={[styles.label, { marginBottom: 4 }]}>おすすめの服装</Text>
    {data.recommendedClothing.map((item, i) => (
       <View key={i} style={styles.warningItem}>
        <View style={styles.bullet} />
        <Text style={styles.value}>{item}</Text>
      </View>
    ))}

    {data.forecast && data.forecast.length > 0 && (
       <View style={{ marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#eee' }}>
         <Text style={[styles.label, { marginBottom: 4 }]}>天気予報</Text>
         {data.forecast.slice(0, 3).map((f, i) => ( // Show first 3 days
           <View key={i} style={styles.row}>
             <Text style={styles.label}>{f.date}</Text>
             <Text style={styles.value}>{f.condition} ({f.high}°C / {f.low}°C)</Text>
           </View>
         ))}
       </View>
    )}
  </View>
);

// Helper to render Visa Info
const VisaInfoView = ({ data }: { data: VisaInfo }) => (
  <View style={styles.contentBox}>
    <View style={styles.row}>
      <Text style={styles.label}>ビザ必要性</Text>
      <Text style={[styles.value, { fontWeight: 'bold' }]}>
        {data.required ? "必要" : "不要"}
        {data.visaFreeStayDays ? ` (${data.visaFreeStayDays}日以内の滞在)` : ""}
      </Text>
    </View>

    {data.requirements.length > 0 && (
      <View style={{ marginTop: 8 }}>
        <Text style={[styles.label, { marginBottom: 4 }]}>入国要件</Text>
        {data.requirements.map((req, i) => (
          <View key={i} style={styles.warningItem}>
            <View style={styles.bullet} />
            <Text style={styles.value}>{req}</Text>
          </View>
        ))}
      </View>
    )}

     {data.notes.length > 0 && (
      <View style={{ marginTop: 8 }}>
        <Text style={[styles.label, { marginBottom: 4 }]}>補足事項</Text>
        {data.notes.map((note, i) => (
          <View key={i} style={styles.warningItem}>
            <View style={styles.bullet} />
            <Text style={styles.value}>{note}</Text>
          </View>
        ))}
      </View>
    )}
  </View>
);

// Helper to render Manner Info
const MannerInfoView = ({ data }: { data: MannerInfo }) => (
  <View style={styles.contentBox}>
    <Text style={[styles.label, { marginBottom: 4 }]}>チップ</Text>
    <Text style={styles.textBlock}>
      {data.tipping.required ? "必須" : data.tipping.customary ? "慣習的" : "基本不要"} - {data.tipping.guideline}
    </Text>

    <View style={{ marginTop: 8 }}>
      <Text style={[styles.label, { marginBottom: 4 }]}>習慣・マナー</Text>
      {data.customs.map((custom, i) => (
        <View key={i} style={styles.warningItem}>
          <View style={styles.bullet} />
          <Text style={styles.value}>{custom}</Text>
        </View>
      ))}
    </View>

    <View style={{ marginTop: 8 }}>
      <Text style={[styles.label, { marginBottom: 4 }]}>タブー・注意点</Text>
      {data.taboos.map((taboo, i) => (
        <View key={i} style={styles.warningItem}>
          <View style={styles.bullet} />
          <Text style={styles.value}>{taboo}</Text>
        </View>
      ))}
    </View>
  </View>
);

// Helper to render Transport Info
const TransportInfoView = ({ data }: { data: TransportInfo }) => (
  <View style={styles.contentBox}>
    <Text style={[styles.label, { marginBottom: 4 }]}>公共交通機関</Text>
    {data.publicTransport.map((pt, i) => (
       <View key={i} style={styles.warningItem}>
        <View style={styles.bullet} />
        <Text style={styles.value}>{pt}</Text>
      </View>
    ))}

    <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.label}>ライドシェア</Text>
      <Text style={styles.value}>
        {data.rideshare.available ? `利用可能 (${data.rideshare.services.join(", ")})` : "利用不可"}
      </Text>
    </View>

    {data.drivingNotes && data.drivingNotes.length > 0 && (
       <View style={{ marginTop: 8 }}>
          <Text style={[styles.label, { marginBottom: 4 }]}>運転の注意点</Text>
          {data.drivingNotes.map((note, i) => (
             <View key={i} style={styles.warningItem}>
              <View style={styles.bullet} />
              <Text style={styles.value}>{note}</Text>
            </View>
          ))}
       </View>
    )}
  </View>
);


const TravelInfoPDF: React.FC<TravelInfoPDFProps> = ({ destination, country, categoryStates }) => {
  const sortedCategories: TravelInfoCategory[] = [
    "basic",
    "safety",
    "climate",
    "visa",
    "manner",
    "transport",
  ];

  const renderCategoryContent = (category: TravelInfoCategory, data: unknown) => {
    switch (category) {
      case "basic": return <BasicInfoView data={data as BasicCountryInfo} />;
      case "safety": return <SafetyInfoView data={data as SafetyInfo} />;
      case "climate": return <ClimateInfoView data={data as ClimateInfo} />;
      case "visa": return <VisaInfoView data={data as VisaInfo} />;
      case "manner": return <MannerInfoView data={data as MannerInfo} />;
      case "transport": return <TransportInfoView data={data as TransportInfo} />;
      default: return <Text>No data available</Text>;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.brandText}>TRAVEL INFO GUIDE</Text>
            <View style={styles.destinationBox}>
              <Text style={styles.destination}>{destination}</Text>
            </View>
            <Text style={styles.metaInfo}>{country}</Text>
          </View>
          <View style={styles.headerRight}>
             <Text style={styles.metaInfo}>{new Date().toLocaleDateString('ja-JP')}</Text>
          </View>
        </View>

        {/* Content */}
        {sortedCategories.map((category) => {
          const state = categoryStates.get(category);
          if (!state || state.status !== "success" || !state.data) return null;

          return (
            <View key={category} style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Text style={styles.sectionIconText}>
                     {/* Using first letter as simple icon replacement */}
                     {CATEGORY_LABELS[category].charAt(0)}
                  </Text>
                </View>
                <Text style={styles.sectionTitle}>{CATEGORY_LABELS[category]}</Text>
              </View>
              {renderCategoryContent(category, state.data.data)}
            </View>
          );
        })}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          } />
          <Text style={styles.footerBrand}>Powered by Tabidea</Text>
        </View>
      </Page>
    </Document>
  );
};

export default TravelInfoPDF;
