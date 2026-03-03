import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Container, Section, SectionHeading } from '@/components/Container';
import { pageTransition } from '@/lib/motion';
import { FilterPills, type FilterPillOption } from '@/components/gallery/FilterPills';
import { GalleryTabs } from '@/components/gallery/GalleryTabs';
import { LightboxModal } from '@/components/gallery/LightboxModal';
import { MediaGrid } from '@/components/gallery/MediaGrid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  type EventType,
  type GalleryItem,
  type GalleryCity,
  type GallerySection,
  branchScopedEventTypes,
  eventTypeConfigs,
  galleryBranches,
  galleryCities,
  galleryItems,
} from '@/data/galleryItems';

const galleryTabs: Array<{ value: GallerySection; label: string }> = [
  { value: 'branches', label: 'Branches' },
  { value: 'events', label: 'Events' },
  { value: 'seminars', label: 'Seminars' },
  { value: 'certificates', label: 'Certificates' },
];

const allValue = 'all';
const allEventTypeValue = 'all';
const commonBranchValue = 'common';

const getUniqueCityBranches = (city: GalleryCity): string[] =>
  Array.from(
    new Set(
      galleryBranches
        .filter((branch) => branch.city === city)
        .map((branch) => branch.branch)
    )
  );

const countByCity = (items: GalleryItem[]): Record<GalleryCity, number> =>
  galleryCities.reduce<Record<GalleryCity, number>>((accumulator, city) => {
    accumulator[city] = items.filter((item) => item.city === city).length;
    return accumulator;
  }, {} as Record<GalleryCity, number>);

const isBranchScopedEventItem = (item: GalleryItem): boolean =>
  item.eventType ? branchScopedEventTypes.includes(item.eventType) : false;

const isCommonEventItem = (item: GalleryItem): boolean => Boolean(item.isCommonEvent);

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<GallerySection>('branches');
  const [selectedCity, setSelectedCity] = useState<'all' | GalleryCity>(allValue);
  const [selectedBranch, setSelectedBranch] = useState<string>(allValue);
  const [selectedEventType, setSelectedEventType] = useState<'all' | EventType>(allEventTypeValue);
  const [selectedBranchTabBranch, setSelectedBranchTabBranch] = useState<string>(allValue);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const tabItems = useMemo(
    () => galleryItems.filter((item) => item.section === activeTab),
    [activeTab]
  );

  const branchTabItems = useMemo(
    () => galleryItems.filter((item) => item.section === 'branches'),
    []
  );

  const showCityFilters = activeTab === 'events' || activeTab === 'seminars';
  const isAllEventsContext = activeTab === 'events' && selectedCity === allValue && selectedBranch === allValue;

  const cityFilterSourceItems = useMemo(() => {
    if (activeTab === 'seminars') {
      return tabItems;
    }
    if (activeTab === 'events') {
      return tabItems.filter((item) => isBranchScopedEventItem(item) && !isCommonEventItem(item));
    }
    return [];
  }, [activeTab, tabItems]);

  const cityCounts = useMemo(
    () => countByCity(cityFilterSourceItems),
    [cityFilterSourceItems]
  );

  const cityPillOptions = useMemo<FilterPillOption[]>(() => {
    if (!showCityFilters) {
      return [];
    }

    const perCityOptions = galleryCities
      .map((city) => ({
        value: city,
        label: city,
        count: cityCounts[city] ?? 0,
      }))
      .filter((option) => (option.count ?? 0) > 0);

    const allOptions: FilterPillOption[] =
      cityFilterSourceItems.length > 0
        ? [{ value: allValue, label: 'All', count: cityFilterSourceItems.length }]
        : [];

    return [...allOptions, ...perCityOptions];
  }, [cityCounts, cityFilterSourceItems.length, showCityFilters]);

  const cityScopedItems = useMemo(() => {
    if (selectedCity === allValue) {
      return tabItems;
    }

    if (activeTab === 'events') {
      return tabItems.filter((item) => item.city === selectedCity || isCommonEventItem(item));
    }

    return tabItems.filter((item) => item.city === selectedCity);
  }, [activeTab, selectedCity, tabItems]);

  const branchPillOptions = useMemo<FilterPillOption[]>(() => {
    if (!showCityFilters || selectedCity === allValue) {
      return [];
    }

    if (activeTab === 'events') {
      const cityBranchItems = tabItems.filter(
        (item) => isBranchScopedEventItem(item) && !isCommonEventItem(item) && item.city === selectedCity
      );
      const commonCount = tabItems.filter(
        (item) => isBranchScopedEventItem(item) && isCommonEventItem(item)
      ).length;

      const branchCounts = cityBranchItems.reduce<Record<string, number>>((accumulator, item) => {
        accumulator[item.branch] = (accumulator[item.branch] ?? 0) + 1;
        return accumulator;
      }, {});

      const perBranchOptions = getUniqueCityBranches(selectedCity)
        .map((branchName) => ({
          value: branchName,
          label: branchName,
          count: branchCounts[branchName] ?? 0,
        }))
        .filter((option) => (option.count ?? 0) > 0);

      const options: FilterPillOption[] = [
        ...(commonCount > 0 ? [{ value: commonBranchValue, label: 'Common', count: commonCount }] : []),
        ...perBranchOptions,
      ];

      if (options.length <= 1) {
        return options;
      }

      return [
        { value: allValue, label: `All ${selectedCity}`, count: cityBranchItems.length + commonCount },
        ...options,
      ];
    }

    const cityItems = tabItems.filter((item) => item.city === selectedCity);
    const branchCounts = cityItems.reduce<Record<string, number>>((accumulator, item) => {
      accumulator[item.branch] = (accumulator[item.branch] ?? 0) + 1;
      return accumulator;
    }, {});

    const perBranchOptions = getUniqueCityBranches(selectedCity)
      .map((branchName) => ({
        value: branchName,
        label: branchName,
        count: branchCounts[branchName] ?? 0,
      }))
      .filter((option) => (option.count ?? 0) > 0);

    if (perBranchOptions.length <= 1) {
      return perBranchOptions;
    }

    return [
      { value: allValue, label: `All ${selectedCity}`, count: cityItems.length },
      ...perBranchOptions,
    ];
  }, [activeTab, selectedCity, showCityFilters, tabItems]);

  const eventBaseItems = useMemo(() => {
    if (activeTab !== 'events') {
      return [];
    }

    let items = cityScopedItems;
    const hasLocationContext = selectedCity !== allValue || selectedBranch !== allValue;

    if (hasLocationContext) {
      items = items.filter(isBranchScopedEventItem);
    }

    if (selectedCity !== allValue && selectedBranch !== allValue) {
      if (selectedBranch === commonBranchValue) {
        items = items.filter(isCommonEventItem);
      } else {
        items = items.filter((item) => !isCommonEventItem(item) && item.branch === selectedBranch);
      }
    }

    return items;
  }, [activeTab, cityScopedItems, selectedBranch, selectedCity]);

  const eventTypeSelectOptions = useMemo<Array<{ value: 'all' | EventType; label: string; count: number }>>(() => {
    if (activeTab !== 'events') {
      return [];
    }

    const allowedConfigs = isAllEventsContext
      ? eventTypeConfigs
      : eventTypeConfigs.filter((config) => config.branchScoped);

    const typeOptions = allowedConfigs.map((config) => ({
      value: config.value,
      label: config.label,
      count: eventBaseItems.filter((item) => item.eventType === config.value).length,
    }));

    if (isAllEventsContext) {
      return [{ value: allEventTypeValue, label: 'All', count: eventBaseItems.length }, ...typeOptions];
    }

    const nonZeroOptions = typeOptions.filter((option) => option.count > 0);
    return [{ value: allEventTypeValue, label: 'All', count: eventBaseItems.length }, ...nonZeroOptions];
  }, [activeTab, eventBaseItems, isAllEventsContext]);

  const branchSelectOptions = useMemo(() => {
    const counts = branchTabItems.reduce<Record<string, number>>((accumulator, item) => {
      accumulator[item.branch] = (accumulator[item.branch] ?? 0) + 1;
      return accumulator;
    }, {});

    return [
      { value: allValue, label: 'All Branches', count: branchTabItems.length },
      ...galleryBranches.map((branch) => ({
        value: branch.branch,
        label: branch.displayName,
        count: counts[branch.branch] ?? 0,
      })),
    ];
  }, [branchTabItems]);

  const filteredItems = useMemo(() => {
    if (activeTab === 'branches') {
      if (selectedBranchTabBranch === allValue) {
        return tabItems;
      }
      return tabItems.filter((item) => item.branch === selectedBranchTabBranch);
    }

    if (activeTab === 'events') {
      if (selectedEventType === allEventTypeValue) {
        return eventBaseItems;
      }
      return eventBaseItems.filter((item) => item.eventType === selectedEventType);
    }

    if (activeTab === 'certificates') {
      return tabItems;
    }

    const seminarItems = selectedCity === allValue
      ? tabItems
      : tabItems.filter((item) => item.city === selectedCity);

    if (selectedCity === allValue || selectedBranch === allValue) {
      return seminarItems;
    }

    return seminarItems.filter((item) => item.branch === selectedBranch);
  }, [
    activeTab,
    eventBaseItems,
    selectedBranch,
    selectedBranchTabBranch,
    selectedCity,
    selectedEventType,
    tabItems,
  ]);

  useEffect(() => {
    setSelectedCity(allValue);
    setSelectedBranch(allValue);
    setSelectedEventType(allEventTypeValue);
    setSelectedBranchTabBranch(allValue);
    setActiveItemIndex(null);
  }, [activeTab]);

  useEffect(() => {
    if (!showCityFilters) {
      return;
    }

    if (selectedCity === allValue) {
      setSelectedBranch(allValue);
      return;
    }

    const cityExists = cityPillOptions.some((option) => option.value === selectedCity);
    if (!cityExists) {
      setSelectedCity(allValue);
      setSelectedBranch(allValue);
    }
  }, [cityPillOptions, selectedCity, showCityFilters]);

  useEffect(() => {
    if (!showCityFilters || selectedCity === allValue) {
      return;
    }

    if (branchPillOptions.length === 1 && branchPillOptions[0].value !== allValue) {
      setSelectedBranch(branchPillOptions[0].value);
      return;
    }

    const selectedBranchStillExists = branchPillOptions.some((option) => option.value === selectedBranch);
    if (!selectedBranchStillExists) {
      setSelectedBranch(allValue);
    }
  }, [branchPillOptions, selectedBranch, selectedCity, showCityFilters]);

  useEffect(() => {
    if (activeTab !== 'events' || selectedEventType === allEventTypeValue) {
      return;
    }

    const optionExists = eventTypeSelectOptions.some((option) => option.value === selectedEventType);
    if (!optionExists) {
      setSelectedEventType(allEventTypeValue);
    }
  }, [activeTab, eventTypeSelectOptions, selectedEventType]);

  useEffect(() => {
    if (activeItemIndex !== null && activeItemIndex >= filteredItems.length) {
      setActiveItemIndex(null);
    }
  }, [activeItemIndex, filteredItems.length]);

  const handleCityChange = (value: string) => {
    const nextCity = value as 'all' | GalleryCity;
    setSelectedCity(nextCity);
    setSelectedBranch(allValue);
  };

  const gridAnimationKey = `${activeTab}-${selectedCity}-${selectedBranch}-${selectedEventType}-${selectedBranchTabBranch}`;

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Gallery - SmartByte Computer Education</title>
        <meta
          name="description"
          content="Explore SmartByte branch, event, seminar, and certificate media from all branches in one gallery."
        />
      </Helmet>

      <Section>
        <Container>
          <SectionHeading title="Our Gallery" subtitle="Browse branch, event, seminar, and certificate media in one place" gradient />

          <div className="mb-8 space-y-3">
            <GalleryTabs tabs={galleryTabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 'branches' && (
              <div className="mx-auto w-full max-w-sm">
                <p className="mb-1 text-xs font-medium text-muted-foreground">Choose Branch</p>
                <Select value={selectedBranchTabBranch} onValueChange={setSelectedBranchTabBranch}>
                  <SelectTrigger className="h-10 rounded-full border-2 border-primary/55 bg-black/70">
                    <SelectValue placeholder="All Branches" />
                  </SelectTrigger>
                  <SelectContent>
                    {branchSelectOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label} {`(${option.count})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {showCityFilters && cityPillOptions.length > 0 && (
              <FilterPills
                options={cityPillOptions}
                selectedValue={selectedCity}
                onChange={handleCityChange}
              />
            )}

            {showCityFilters && selectedCity !== allValue && branchPillOptions.length > 0 && (
              <FilterPills
                options={branchPillOptions}
                selectedValue={selectedBranch}
                onChange={setSelectedBranch}
              />
            )}

            {activeTab === 'events' && (
              <div className="mx-auto w-full max-w-xs sm:max-w-sm">
                <p className="mb-1 text-xs font-medium text-muted-foreground">Event Type</p>
                <Select
                  value={selectedEventType}
                  onValueChange={(value) => setSelectedEventType(value as 'all' | EventType)}
                >
                  <SelectTrigger className="h-10 rounded-full border-2 border-primary/55 bg-black/70">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypeSelectOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label} {`(${option.count})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {activeTab === 'events' && (
              <p className="text-center text-xs text-muted-foreground/80">
                Select City {'->'} (optional) select Branch {'->'} choose Event Type
              </p>
            )}
          </div>

          <motion.div
            key={gridAnimationKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <MediaGrid items={filteredItems} onOpenItem={setActiveItemIndex} />
          </motion.div>

          <LightboxModal
            items={filteredItems}
            activeIndex={activeItemIndex}
            onActiveIndexChange={setActiveItemIndex}
          />
        </Container>
      </Section>
    </motion.div>
  );
};

export default Gallery;
