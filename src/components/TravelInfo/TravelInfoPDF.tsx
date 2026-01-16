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

const theme = {
  primary: "#e67e22", // Orange
  text: "#2c2c2c", // Dark Grey
  textLight: "#6b7280", // Light Grey
  bg: "#fcfbf9", // Cream
  border: "#e5e7eb", // Light Border
  sectionBg: "#ffffff", // White
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Noto Sans JP",
    fontSize: 9,
    backgroundColor: theme.bg,
    color: theme.text,
  },
  // Header
  header: {
    marginBottom: 25,
    borderBottomWidth: 2,
    borderBottomColor: theme.primary,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerLeft: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 10,
    color: theme.primary,
    letterSpacing: 2,
    marginBottom: 8,
    fontWeight: "bold",
  },
  destinationTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.text,
    lineHeight: 1,
  },
  countrySubtitle: {
    fontSize: 12,
    color: theme.textLight,
    marginTop: 4,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  dateBox: {
    backgroundColor: theme.sectionBg,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.border,
  },
  dateText: {
    fontSize: 9,
    color: theme.textLight,
  },

  // Layout
  columns: {
    flexDirection: "row",
    gap: 15,
  },
  column: {
    flex: 1,
    flexDirection: "column",
    gap: 15,
  },

  // Section
  section: {
    backgroundColor: theme.sectionBg,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 12,
  },
  sectionTitleBox: {
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    paddingBottom: 6,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionIcon: {
    width: 4,
    height: 12,
    backgroundColor: theme.primary,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: theme.text,
  },

  // Content
  row: {
    flexDirection: "row",
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f3f4f6",
  },
  rowLast: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  label: {
    width: "30%",
    color: theme.textLight,
    fontSize: 8,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
    color: theme.text,
    fontSize: 9,
  },
  text: {
    fontSize: 9,
    lineHeight: 1.5,
    color: theme.text,
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 9,
    fontWeight: "bold",
    color: theme.text,
    marginTop: 8,
    marginBottom: 4,
    backgroundColor: "#f3f4f6",
    padding: 3,
    borderRadius: 2,
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "bold",
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 4,
  },
  bullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: theme.primary,
    marginRight: 6,
    marginTop: 5,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8,
    color: theme.textLight,
  },
});

interface TravelInfoPDFProps {
  destination: string;
  country: string;
  categoryStates: Map<TravelInfoCategory, CategoryState>;
  dates?: { start: string; end: string };
}

// Helpers
const DangerBadge = ({ level }: { level: number }) => {
  const colors = ["#10b981", "#f59e0b", "#f97316", "#ef4444", "#7f1d1d"];
  const safeLevel = (level >= 0 && level <= 4 ? level : 0) as 0 | 1 | 2 | 3 | 4;
  const color = colors[safeLevel] || "#6b7280";
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.badgeText}>
        LV.{level} {DANGER_LEVEL_DESCRIPTIONS[safeLevel]}
      </Text>
    </View>
  );
};

// --- Section Renderers ---

const BasicInfoView = ({ data }: { data: BasicCountryInfo }) => (
  <View>
    <View style={styles.row}>
      <Text style={styles.label}>通貨</Text>
      <Text style={styles.value}>{data.currency.name} ({data.currency.code})</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>言語</Text>
      <Text style={styles.value}>{data.languages.join(", ")}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>時差</Text>
      <Text style={styles.value}>{data.timeDifference}</Text>
    </View>
    <View style={[styles.row, styles.rowLast]}>
      <Text style={styles.label}>タイムゾーン</Text>
      <Text style={styles.value}>{data.timezone}</Text>
    </View>
  </View>
);

const SafetyInfoView = ({ data }: { data: SafetyInfo }) => (
  <View>
    <DangerBadge level={data.dangerLevel} />
    <Text style={styles.text}>{data.dangerLevelDescription}</Text>

    <Text style={styles.subHeader}>緊急連絡先</Text>
    {data.emergencyContacts.map((c, i) => (
      <View key={i} style={[styles.row, i === data.emergencyContacts.length - 1 ? styles.rowLast : {}]}>
        <Text style={styles.label}>{c.name}</Text>
        <Text style={styles.value}>{c.number}</Text>
      </View>
    ))}
  </View>
);

const ClimateInfoView = ({ data }: { data: ClimateInfo }) => (
  <View>
    <Text style={styles.text}>{data.seasonDescription}</Text>
    <Text style={styles.subHeader}>服装アドバイス</Text>
    {data.recommendedClothing.map((item, i) => (
      <View key={i} style={styles.bulletItem}>
        <View style={styles.bullet} />
        <Text style={styles.value}>{item}</Text>
      </View>
    ))}
  </View>
);

const VisaInfoView = ({ data }: { data: VisaInfo }) => (
  <View>
    <View style={[styles.row, styles.rowLast]}>
      <Text style={styles.label}>ビザ要否</Text>
      <Text style={[styles.value, { color: data.required ? '#ef4444' : '#10b981', fontWeight: 'bold' }]}>
        {data.required ? "必要" : "不要"}
        {data.visaFreeStayDays ? ` (${data.visaFreeStayDays}日以内)` : ""}
      </Text>
    </View>
    {data.requirements.length > 0 && (
      <View style={{ marginTop: 6 }}>
        <Text style={styles.subHeader}>要件</Text>
        {data.requirements.map((req, i) => (
          <View key={i} style={styles.bulletItem}>
            <View style={styles.bullet} />
            <Text style={styles.value}>{req}</Text>
          </View>
        ))}
      </View>
    )}
  </View>
);

const MannerInfoView = ({ data }: { data: MannerInfo }) => (
  <View>
    <Text style={styles.subHeader}>チップ: {data.tipping.required ? "必須" : data.tipping.customary ? "慣習" : "不要"}</Text>
    <Text style={styles.text}>{data.tipping.guideline}</Text>

    <Text style={styles.subHeader}>マナー・習慣</Text>
    {data.customs.slice(0, 3).map((c, i) => (
      <View key={i} style={styles.bulletItem}>
        <View style={styles.bullet} />
        <Text style={styles.value}>{c}</Text>
      </View>
    ))}
  </View>
);

const TransportInfoView = ({ data }: { data: TransportInfo }) => (
  <View>
    <Text style={styles.subHeader}>交通機関</Text>
    {data.publicTransport.slice(0, 3).map((pt, i) => (
      <View key={i} style={styles.bulletItem}>
        <View style={styles.bullet} />
        <Text style={styles.value}>{pt}</Text>
      </View>
    ))}
    <View style={{ marginTop: 6 }}>
        <Text style={styles.subHeader}>ライドシェア</Text>
        <Text style={styles.value}>
            {data.rideshare.available ? `利用可 (${data.rideshare.services.join(", ")})` : "利用不可"}
        </Text>
    </View>
  </View>
);

const TravelInfoPDF: React.FC<TravelInfoPDFProps> = ({ destination, country, categoryStates, dates }) => {

  const renderSection = (category: TravelInfoCategory) => {
    const state = categoryStates.get(category);
    if (!state || state.status !== "success" || !state.data) return null;

    const data = state.data.data;
    let content = null;

    switch (category) {
      case "basic": content = <BasicInfoView data={data as BasicCountryInfo} />; break;
      case "safety": content = <SafetyInfoView data={data as SafetyInfo} />; break;
      case "climate": content = <ClimateInfoView data={data as ClimateInfo} />; break;
      case "visa": content = <VisaInfoView data={data as VisaInfo} />; break;
      case "manner": content = <MannerInfoView data={data as MannerInfo} />; break;
      case "transport": content = <TransportInfoView data={data as TransportInfo} />; break;
      default: return null;
    }

    return (
      <View key={category} style={styles.section}>
        <View style={styles.sectionTitleBox}>
          <View style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>{CATEGORY_LABELS[category]}</Text>
        </View>
        {content}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.brandTitle}>TRAVEL SUPPORT GUIDE</Text>
            <Text style={styles.destinationTitle}>{destination}</Text>
            <Text style={styles.countrySubtitle}>{country}</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.dateBox}>
                <Text style={styles.dateText}>
                    作成日: {new Date().toLocaleDateString("ja-JP")}
                </Text>
                {dates && (
                    <Text style={[styles.dateText, { marginTop: 2 }]}>
                        渡航予定: {dates.start} - {dates.end}
                    </Text>
                )}
            </View>
          </View>
        </View>

        {/* Content Layout */}
        <View style={styles.columns}>
          <View style={styles.column}>
            {renderSection("basic")}
            {renderSection("visa")}
            {renderSection("transport")}
          </View>
          <View style={styles.column}>
            {renderSection("safety")}
            {renderSection("climate")}
            {renderSection("manner")}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
          <Text style={[styles.footerText, { color: theme.primary, fontWeight: 'bold' }]}>Powered by Tabidea</Text>
        </View>
      </Page>
    </Document>
  );
};

export default TravelInfoPDF;
