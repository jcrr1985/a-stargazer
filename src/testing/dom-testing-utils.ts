import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

const selectElement = <T = HTMLElement>(
  fixture: ComponentFixture<any>,
  selector: string
): T => {
  return fixture.debugElement.query(By.css(selector)).nativeElement;
};

const selectAllElements = (
  fixture: ComponentFixture<any>,
  selector: string
): DebugElement[] => {
  return fixture.debugElement.queryAll(By.css(selector));
};

const clickElement = (
  fixture: ComponentFixture<any>,
  selector: string
): void => {
  const element: HTMLElement = selectElement(fixture, selector);
  element.click();
};

const focusElement = (
  fixture: ComponentFixture<any>,
  selector: string
): void => {
  const element: HTMLElement = selectElement(fixture, selector);
  element.focus();
};

const blurElement = (
  fixture: ComponentFixture<any>,
  selector: string
): void => {
  const element: HTMLElement = selectElement(fixture, selector);
  element.blur();
};

const getInnerHTML = (
  fixture: ComponentFixture<any>,
  selector: string
): string => {
  const element: HTMLElement = selectElement(fixture, selector);
  return element.innerHTML;
};

const getTextContent = (
  fixture: ComponentFixture<any>,
  selector: string
): string | null => {
  const element: HTMLElement = selectElement(fixture, selector);
  return element.textContent;
};

const getInnerText = (
  fixture: ComponentFixture<any>,
  selector: string
): string => {
  const element: HTMLElement = selectElement(fixture, selector);
  return element.innerText;
};

const dispatchInputValue = (
  fixture: ComponentFixture<any>,
  selector: string,
  value: string
) => {
  const inputElement = selectElement<HTMLInputElement>(fixture, selector);
  inputElement.dispatchEvent(new Event('focusin'));
  inputElement.value = value;
  inputElement.dispatchEvent(new Event('input'));
};

export {
  blurElement,
  clickElement,
  dispatchInputValue,
  focusElement,
  getInnerHTML,
  getInnerText,
  getTextContent,
  selectAllElements,
  selectElement,
};
