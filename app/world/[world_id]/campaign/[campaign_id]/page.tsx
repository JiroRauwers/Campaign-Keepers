"use client";

import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import NavbarSSR from "@/components/NavbarSSR";
import CampaignHeader from "@/components/CampaignHeader";
import PageBase from "@/components/PageBase";
import NPCList from "@/components/NPCList";
import Timeline from "@/components/Timeline";
import PlayersList from "@/components/PlayersList";
import CharacterSheets from "@/components/CharacterSheets";
import styles from "./CampaignPage.module.css";

// ... (previous interfaces remain unchanged)

export function CampaignPage({
  params: { campaign_id },
}: {
  params: { campaign_id: string };
}) {
  // ... (previous code for fetching campaign data remains unchanged)

  const [columns, setColumns] = useState<Record<string, Column>>({});

  useEffect(() => {
    const initialColumns: Record<string, Column> = {
      A: {
        columnName: "A",
        columnSize: "sm",
        items: [
          {
            id: "npcList",
            content: <NPCList npcs={npcs} />,
            rowSpan: 2,
            colSpan: 1,
          },
          {
            id: "playersList",
            content: <PlayersList players={[]} />,
            rowSpan: 1,
            colSpan: 1,
          },
          {
            id: "characterSheets",
            content: <CharacterSheets sheets={campaign.sheets} />,
            rowSpan: 3,
            colSpan: 1,
          },
        ],
      },
      B: {
        columnName: "B",
        columnSize: "md",
        items: [
          {
            id: "timeline",
            content: <Timeline events={filteredEvents} />,
            rowSpan: 3,
            colSpan: 2,
          },
          {
            id: "notes",
            content: <div>Campaign Notes</div>,
            rowSpan: 2,
            colSpan: 2,
          },
          {
            id: "quests",
            content: <div>Active Quests</div>,
            rowSpan: 1,
            colSpan: 1,
          },
        ],
      },
      C: {
        columnName: "C",
        columnSize: "lg",
        items: [
          { id: "map", content: <div>World Map</div>, rowSpan: 2, colSpan: 3 },
          {
            id: "inventory",
            content: <div>Party Inventory</div>,
            rowSpan: 1,
            colSpan: 2,
          },
          {
            id: "calendar",
            content: <div>Campaign Calendar</div>,
            rowSpan: 2,
            colSpan: 1,
          },
          {
            id: "weather",
            content: <div>Weather Conditions</div>,
            rowSpan: 1,
            colSpan: 1,
          },
        ],
      },
    };

    setColumns(initialColumns);
  }, [npcs, filteredEvents, campaign.sheets]);

  const onDragEnd = (result: DropResult) => {
    // ... (onDragEnd function remains unchanged)
  };

  return (
    <>
      <NavbarSSR />
      <div className="flex flex-col">
        <CampaignHeader {...{ campaign }} />

        <PageBase disableNav disableFooter className="gap-6">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.columnsContainer}>
              {Object.entries(columns).map(([columnId, column]) => (
                <div
                  key={columnId}
                  className={`${styles.sheetColumn} ${styles[column.columnSize]}`}
                >
                  <h2 className="text-xl font-bold mb-4">
                    {column.columnName}
                  </h2>
                  <Droppable droppableId={columnId}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={styles.gridContainer}
                      >
                        {column.items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${styles.gridItem} ${styles[`colSpan${item.colSpan}`]} ${styles[`rowSpan${item.rowSpan}`]}`}
                              >
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </PageBase>
      </div>
    </>
  );
}

export default CampaignPage;
